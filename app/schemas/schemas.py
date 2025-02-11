from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class DeviceBase(BaseModel):
    name: str

class DeviceCreate(DeviceBase):
    pass

class Device(DeviceBase):
    id: int
    status: str
    last_seen: datetime

    class Config:
        from_attributes = True

class JobBase(BaseModel):
    binary_path: str

class JobCreate(JobBase):
    device_id: int
    group_id: int

class JobStatusUpdate(BaseModel):
    status: str
    output_file: Optional[str] = None

class Job(JobBase):
    id: int
    group_id: int
    device_id: int
    status: str
    output_file: Optional[str]
    created_at: datetime
    started_at: Optional[datetime]
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True

class JobGroupBase(BaseModel):
    name: str

class JobGroupCreate(JobGroupBase):
    device_ids: List[int]
    binary_path: str

class JobGroup(JobGroupBase):
    id: int
    status: str
    created_at: datetime
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    jobs: List[Job]

    class Config:
        from_attributes = True