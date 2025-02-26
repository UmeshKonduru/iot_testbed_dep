from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio

from .api import devices, gateways, job_groups, jobs, auth, files
from .models.models import Base
from .database import engine, get_db
from .queue.redis_client import redis_client
from .scheduler.scheduler import scheduler
from pydantic import BaseModel

@asynccontextmanager
async def lifespan(app: FastAPI):
    await redis_client.init()
    asyncio.create_task(scheduler.start())
    yield
    await scheduler.stop()
    await redis_client.close()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="IoT Testbed API",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(devices.router, prefix="/api/v1")
app.include_router(gateways.router, prefix="/api/v1")
app.include_router(job_groups.router, prefix="/api/v1")
app.include_router(jobs.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(files.router, prefix="/api/v1")