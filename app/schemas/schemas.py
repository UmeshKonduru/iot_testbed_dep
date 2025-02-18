from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional
from ..models.models import DeviceStatus, JobStatus

# User Schemas
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserSchema(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

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

class JobGroupSchema(JobGroupBase):
    id: int
    user_id: int
    status: JobStatus
    created_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    jobs: List[JobSchema]

    class Config:
        from_attributes = True

# File Schemas
class FileSchema(BaseModel):
    id: int
    filename: str
    created_at: datetime

    class Config:
        from_attributes = True