from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
from ..models.models import DeviceStatus, JobStatus

# Device Schemas
class DeviceBase(BaseModel):
    name: str = Field(..., max_length=100)

class DeviceCreate(DeviceBase):
    pass

class DeviceSchema(DeviceBase):
    id: int
    status: DeviceStatus
    last_seen: datetime

    class Config:
        from_attributes = True

# Job Schemas
class JobBase(BaseModel):
    binary_path: str

class JobStatusUpdate(BaseModel):
    status: JobStatus
    output_file: Optional[str] = None

class JobSchema(JobBase):
    id: int
    group_id: int
    device_id: int
    status: JobStatus
    output_file: Optional[str] = None
    created_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# JobGroup Schemas
class JobGroupBase(BaseModel):
    name: str

class JobGroupCreate(JobGroupBase):
    device_ids: List[int]
    binary_path: str

class JobGroupSchema(JobGroupBase):
    id: int
    status: JobStatus
    created_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    jobs: List[JobSchema]

    class Config:
        from_attributes = True