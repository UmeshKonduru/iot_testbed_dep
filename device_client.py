import aiohttp
import asyncio
import json
import logging
import os
import subprocess
from datetime import datetime
import redis.asyncio as redis

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DeviceClient:
    def __init__(self, device_id: int, api_base_url: str, redis_url: str):
        self.device_id = device_id
        self.api_base_url = api_base_url
        self.redis_url = redis_url
        self.redis = None
        self.running = False
        self.heartbeat_interval = 30 # seconds
        self.session = None
    
    async def init(self):
        self.redis = await redis.from_url(self.redis_url)
        self.session = aiohttp.ClientSession()

    async def close(self):
        if self.redis:
            await self.redis.close()
        if self.session:
            await self.session.close()
    
    async def send_heartbeat(self):
        try:
            async with self.session.post(
                f"{self.api_base_url}/api/v1/devices/{self.device_id}/heartbeat",
            ) as response:
                if response.status != 200:
                    logger.error(f"Failed to send heartbeat: {response.status}")
        except Exception as e:
            logger.error(f"Failed to send heartbeat: {e}")
    
    async def update_job_status(self, job_id: int, status: str, output_file: str = None):
        data = {"status": status}
        if output_file:
            data["output_file"] = output_file
        
        try:
            async with self.session.put(
                f"{self.api_base_url}/api/v1/jobs/{job_id}/status",
                json=data
            ) as response:
                if response.status != 200:
                    logger.error(f"Failed to update job status: {response.status}")
        except Exception as e:
            logger.error(f"Failed to update job status: {e}")
    
    async def execute_job(self, job_data: dict) -> bool:
        job_id = job_data["job_id"]
        binary_path = job_data["binary_path"]
        output_file = f"job_{job_id}_output.txt"

        try:
            await self.update_job_status(job_id, "running")

            process = await asyncio.create_subprocess_exec(
                binary_path,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )

            stdout, stderr = await process.communicate()

            with open(output_file, "wb") as f:
                f.write(stdout)
                if stderr:
                    f.write(b"\n=== STDERR ===\n")
                    f.write(stderr)
            
            success = process.returncode == 0
            status = "completed" if success else "failed"
            await self.update_job_status(job_id, status, output_file)

            return success

        except Exception as e:
            logger.error(f"Failed to execute job: {e}")
            await self.update_job_status(job_id, "failed")
            return False
    
    async def poll_for_jobs(self):
        queue_key = f"device:{self.device_id}:jobs"

        while self.running:
            try:
                result = await self.redis.brpop(queue_key, timeout=30)

                if result:
                    _, job_data = result
                    job_data = json.loads(job_data)
                    logger.info(f"Received job: {job_data}")
                    await self.execute_job(job_data)

            except Exception as e:
                logger.error(f"Failed to poll for jobs: {e}")
                await asyncio.sleep(5)
    
    async def start(self):
        await self.init()
        self.running = True

        heartbeat_task = asyncio.create_task(self.heartbeat_loop())
        poll_task = asyncio.create_task(self.poll_for_jobs())

        try:
            await asyncio.gather(heartbeat_task, poll_task)
        except Exception as e:
            logger.error(f"Device client error: {e}")
        finally:
            self.running = False
            await self.close()
    
    async def heartbeat_loop(self):
        while self.running:
            await self.send_heartbeat()
            await asyncio.sleep(self.heartbeat_interval)

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="IoT Device Client")
    parser.add_argument("device_id", type=int, help="Device ID")
    parser.add_argument("--api-url", default="http://localhost:8000", help="API base URL")
    parser.add_argument("--redis-url", default="redis://localhost", help="Redis URL")
    
    args = parser.parse_args()
    
    client = DeviceClient(args.device_id, args.api_url, args.redis_url)
    
    asyncio.run(client.start())