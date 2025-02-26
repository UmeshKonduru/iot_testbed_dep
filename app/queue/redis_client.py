import redis.asyncio as redis
import json
from typing import Dict, Any
from ..config import settings

class RedisClient:
    def __init__(self):
        self.redis_url = settings.REDIS_URL
        self._redis = None

    async def init(self):
        if self._redis is None:
            self._redis = await redis.from_url(self.redis_url)
    
    async def close(self):
        if self._redis is not None:
            await self._redis.close()
    
    async def push_job(self, gateway_id: int, job_data: Dict[str, Any]):
        queue_key = f"gateway:{gateway_id}:jobs"
        await self._redis.lpush(queue_key, json.dumps(job_data))
    
    async def get_job(self, gateway_id: int) -> Dict[str, Any]:
        queue_key = f"gateway:{gateway_id}:jobs"
        result = await self._redis.brpop(queue_key, timeout=30)
        if result:
            _, job_data = result
            return json.loads(job_data)
        return None
    
    async def publish_status(self, job_id: int, status: str, message: str):
        channel = f"job:{job_id}:status"
        await self._redis.publish(channel, json.dumps({
            "status": status,
            "message": message
        }))
    
redis_client = RedisClient()