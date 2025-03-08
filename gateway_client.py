# gateway_client.py
import asyncio
import os
import aiohttp
from redis_client import redis_client

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
                await download_file(job_id, source_file_id)
            else:
                print("Invalid notification format:", notification)
        else:
            print("No notification received.")
        # Poll every 1 second
        await asyncio.sleep(1)

async def download_file(job_id: int, file_id: int):
    download_url = f"{SERVER_URL}/api/v1/gateways/download/{file_id}"
    headers = {"X-Gateway-Token": GATEWAY_TOKEN}
    
    print(f"Downloading file for Job ID {job_id} from {download_url}...")
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(download_url, headers=headers) as response:
                if response.status == 200:
                    # Attempt to get filename from Content-Disposition header
                    disposition = response.headers.get("Content-Disposition", "")
                    if "filename=" in disposition:
                        filename = disposition.split("filename=")[-1].strip('"')
                    else:
                        filename = f"file_{file_id}"
                    filepath = os.path.join(DOWNLOAD_DIR, filename)
                    # Read file content
                    content = await response.read()
                    with open(filepath, "wb") as f:
                        f.write(content)
                    print(f"File downloaded and saved as {filepath}")
                    # Optionally: Notify the server that download is complete via a dedicated endpoint.
                else:
                    text = await response.text()
                    print(f"Failed to download file: HTTP {response.status} {text}")
    except Exception as e:
        print(f"Error downloading file for job {job_id}: {str(e)}")

async def main():
    await poll_for_download_notifications()

if __name__ == "__main__":
    asyncio.run(main())
