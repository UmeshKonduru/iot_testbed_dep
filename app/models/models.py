from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Device(Base):
    __tablename__ = 'devices'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    status = Column(String)  # 'available', 'busy', 'offline'
    last_seen = Column(DateTime, default=datetime.utcnow)

class JobGroup(Base):
    __tablename__ = 'job_groups'
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    status = Column(String)  # 'pending', 'running', 'completed', 'failed'
    created_at = Column(DateTime, default=datetime.utcnow)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    jobs = relationship("Job", back_populates="group")

class Job(Base):
    __tablename__ = 'jobs'
    
    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey('job_groups.id'))
    device_id = Column(Integer, ForeignKey('devices.id'))
    binary_path = Column(String)  # Path to the executable
    output_file = Column(String)  # Path to the log file
    status = Column(String)  # 'pending', 'running', 'completed', 'failed'
    created_at = Column(DateTime, default=datetime.utcnow)
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    group = relationship("JobGroup", back_populates="jobs")
    device = relationship("Device")