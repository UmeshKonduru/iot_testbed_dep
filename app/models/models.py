from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from enum import Enum

Base = declarative_base()

class DeviceStatus(str, Enum):
    available = "available"
    busy = "busy"
    offline = "offline"

class JobStatus(str, Enum):
    pending = "pending"
    running = "running"
    completed = "completed"
    failed = "failed"
    cancelled = "cancelled"

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    job_groups = relationship("JobGroup", back_populates="user")

class Device(Base):
    __tablename__ = 'devices'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    status = Column(SQLEnum(DeviceStatus), default=DeviceStatus.available, nullable=False)
    last_seen = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)

class JobGroup(Base):
    __tablename__ = 'job_groups'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    status = Column(SQLEnum(JobStatus), default=JobStatus.pending, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="job_groups")
    jobs = relationship("Job", back_populates="group")

class Job(Base):
    __tablename__ = 'jobs'
    
    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey('job_groups.id'), nullable=False)
    device_id = Column(Integer, ForeignKey('devices.id'), nullable=False)
    binary_path = Column(String, nullable=False)  # Path to the executable
    output_file = Column(String, nullable=True)   # Path to the log file
    status = Column(SQLEnum(JobStatus), default=JobStatus.pending, nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    group = relationship("JobGroup", back_populates="jobs")
    device = relationship("Device")

class File(Base):
    __tablename__ = 'files'
    
    id = Column(Integer, primary_key=True)
    filename = Column(String, nullable=False)
    path = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    
    user = relationship("User", backref="files")