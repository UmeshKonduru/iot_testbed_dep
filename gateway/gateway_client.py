import asyncio
import os
import aiohttp
import subprocess  # used for synchronous compilation; alternatively, asyncio.subprocess can be used
from redis_client import redis_client  # assuming redis_client is imported correctly
from gateway_add_device import get_device_port  # assuming this function is defined in gateway_add_device.py

# Gateway configuration (update these as needed)
GATEWAY_ID = 1  # Unique ID for this gateway
GATEWAY_TOKEN = "your_gateway_token_here"  # Registration token for authentication
SERVER_URL = "http://<IP-ADDRESS>:8000"  # API server URL (adjust IP/port as needed)
DOWNLOAD_DIR = "./downloads"

# Ensure the download directory exists
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

async def poll_for_download_notifications():
    # Initialize Redis connection if not already initialized
    await redis_client.init()
    print("Polling for download notifications...")

    while True:
        notification = await redis_client.get_download_notification(GATEWAY_ID)
        if notification:
            print("Received notification:", notification)
            job_id = notification.get("job_id")
            source_file_id = notification.get("source_file_id")
            if job_id and source_file_id:
                # Download file, compile it, and update job status
                await process_job(job_id, source_file_id)
            else:
                print("Invalid notification format:", notification)
        else:
            print("No notification received.")
        # Poll every 1 second
        await asyncio.sleep(1)

async def poll_for_job_notifications():
    await redis_client.init()
    print("Polling for job notifications...")
    while True:
        try:
            job_data = await redis_client.get_job(GATEWAY_ID)
            if job_data:
                await handle_job_notification(job_data)
        except Exception as e:
            print(f"Job notification error: {str(e)}")
        await asyncio.sleep(1)

async def handle_job_notification(job_data: dict):
    try:
        job_id = job_data['job_id']
        device_id = job_data['device_id']
        print(f"Received job {job_id} for device {device_id}")
        
        # Update status to 'running' before flashing
        await update_job_status(job_id, "running")
        
        # Flash the device
        await flash_device(job_id, device_id)
        
        # Start log collection
        await collect_logs(job_id, device_id)
        
    except KeyError as e:
        print(f"Invalid job notification format: {str(e)}")
    except Exception as e:
        print(f"Job processing failed: {str(e)}")
        await update_job_status(job_id, "failed")

async def download_file(job_id: int, file_id: int) -> str:
    """
    Downloads the source file into a job-specific directory
    Returns path to the downloaded file
    """
    download_url = f"{SERVER_URL}/api/v1/gateways/download/{file_id}"
    headers = {"X-Gateway-Token": GATEWAY_TOKEN}
    
    # Create job-specific directory
    job_dir = os.path.join(DOWNLOAD_DIR, str(job_id))
    os.makedirs(job_dir, exist_ok=True)
    
    print(f"[Job {job_id}] Downloading file {file_id}...")
    async with aiohttp.ClientSession() as session:
        async with session.get(download_url, headers=headers) as response:
            if response.status == 200:
                # Get filename from headers or generate default
                disposition = response.headers.get("Content-Disposition", "")
                if "filename=" in disposition:
                    filename = disposition.split("filename=")[-1].strip('"')
                else:
                    filename = f"job_{job_id}_source.bin"
                
                filepath = os.path.join(job_dir, filename)
                
                # Save file contents
                content = await response.read()
                with open(filepath, "wb") as f:
                    f.write(content)
                
                print(f"[Job {job_id}] File saved to {filepath}")
                return filepath
            else:
                text = await response.text()
                print(f"[Job {job_id}] Download failed: {response.status} {text}")
                raise Exception(f"Download failed for job {job_id}")

def compile_source_code(job_id: int, source_path: str) -> str:
    """
    Compiles source code in the job-specific directory
    Returns path to compiled binary
    """
    job_dir = os.path.dirname(source_path)
    binary_name = f"job_{job_id}_firmware.bin"
    binary_path = os.path.join(job_dir, binary_name)
    
    print(f"[Job {job_id}] Compiling in {job_dir}...")
    
    try:
        # Example compilation command - replace with your actual toolchain
        compile_cmd = [
            "make", 
            "-C", job_dir, 
            f"SOURCE={source_path}",
            f"OUTPUT={binary_path}"
        ]
        
        # Synchronous compilation for simplicity
        subprocess.check_call(compile_cmd)
        
        print(f"[Job {job_id}] Compilation successful")
        return binary_path
        
    except subprocess.CalledProcessError as e:
        print(f"[Job {job_id}] Compilation failed: {e}")
        raise Exception("Compilation failed") from e

async def update_job_status(job_id: int, new_status: str):
    """
    Calls the job status update endpoint to set the job status to the given new_status.
    """
    update_url = f"{SERVER_URL}/api/v1/jobs/{job_id}/status"
    payload = {"status": new_status}  # you can include additional data if needed
    async with aiohttp.ClientSession() as session:
        async with session.put(update_url, json=payload) as response:
            if response.status == 200:
                print(f"Job {job_id} status updated to {new_status}")
            else:
                text = await response.text()
                print(f"Failed to update job status: HTTP {response.status} {text}")
                raise Exception("Job status update failed")

async def process_job(job_id: int, file_id: int):
    try:
        # Create job directory structure
        job_dir = os.path.join(DOWNLOAD_DIR, str(job_id))
        os.makedirs(job_dir, exist_ok=True)
        
        # Step 1: Download the source file
        source_file_path = await download_file(job_id, file_id)
        
        # Step 2: Compile in the job directory
        binary_path = compile_source_code(job_id, source_file_path)
        
        # Step 3: Update job status
        await update_job_status(job_id, "pending")
        
    except Exception as e:
        print(f"[Job {job_id}] Error processing job: {str(e)}")
        await update_job_status(job_id, "failed")

async def flash_device(job_id: int, device_id: int):
    port = get_device_port(device_id)
    if not port:
        print(f"No port found for device {device_id}")
        await update_job_status(job_id, "failed")
        return
    
    source_path = f"./downloads/{job_id}"
    
    flash_cmd = [
        "make", 
        "flash",
        f"PORT={port}",
        f"SRC_DIR={source_path}",
    ]
    
    try:
        subprocess.check_call(flash_cmd)
        print(f"Flashed {source_path} to {port}")
    except subprocess.CalledProcessError as e:
        print(f"Flashing failed: {str(e)}")
        await update_job_status(job_id, "failed")

async def collect_logs(job_id: int, device_id: int):
    """Placeholder for log collection functionality"""
    print(f"Collecting logs for job {job_id}")
    # TODO: Implement actual log collection
    await asyncio.sleep(5)  # Simulate log collection
    await update_job_status(job_id, "completed")

async def main():
    await asyncio.gather(
        poll_for_download_notifications(),
        poll_for_job_notifications()
    )

if __name__ == "__main__":
    asyncio.run(main())