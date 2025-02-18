from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio

from .api import devices, job_groups, jobs, auth, files
from .models.models import Base
from .database import engine
from .queue.redis_client import redis_client
from .scheduler.scheduler import scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    await redis_client.init()
    asyncio.create_task(scheduler.start())
    yield
    scheduler.stop()
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
    allow_headers=["*"],
)

app.include_router(devices.router, prefix="/api/v1")
app.include_router(job_groups.router, prefix="/api/v1")
app.include_router(jobs.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(files.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to the IoT Testbed API!"}