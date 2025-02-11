from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..database import get_db
from ..models.models import JobGroup, Job, Device
from ..schemas.schemas import JobGroupCreate, JobGroup as JobGroupSchema

router = APIRouter(
    prefix="/job-groups",
    tags=["job groups"]
)

@router.post("/", response_model=JobGroupSchema)
def create_job_group(job_group: JobGroupCreate, db: Session = Depends(get_db)):

    devices = db.query(Device).filter(Device.id.in_(job_group.device_ids)).all()
    
    if len(devices) != len(job_group.device_ids):
        raise HTTPException(status_code=400, detail="One or more devices not found")
    
    db_job_group = JobGroup(
        name=job_group.name,
        status="pending",
        created_at=datetime.now()
    )
    db.add(db_job_group)
    db.flush()
    
    for device_id in job_group.device_ids:
        job = Job(
            group_id=db_job_group.id,
            device_id=device_id,
            binary_path=job_group.binary_path,
            status="pending",
            created_at=datetime.now()
        )
        db.add(job)
    
    try:
        db.commit()
        db.refresh(db_job_group)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    
    return db_job_group

@router.get("/queue")
def get_queue_status(db: Session = Depends(get_db)):

    pending_groups = db.query(JobGroup).filter(JobGroup.status == "pending").all()
    
    queue_status = []
    for group in pending_groups:
        jobs = db.query(Job).filter(Job.group_id == group.id).all()
        device_ids = [job.device_id for job in jobs]
        devices = db.query(Device).filter(Device.id.in_(device_ids)).all()
        
        queue_status.append({
            "group_id": group.id,
            "name": group.name,
            "created_at": group.created_at,
            "devices": [
                {
                    "device_id": device.id,
                    "name": device.name,
                    "status": device.status
                }
                for device in devices
            ],
            "ready_to_run": all(device.status == "available" for device in devices)
        })
    
    return queue_status

@router.get("/", response_model=List[JobGroupSchema])
def get_job_groups(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    job_groups = db.query(JobGroup).offset(skip).limit(limit).all()
    return job_groups

@router.get("/{group_id}", response_model=JobGroupSchema)
def get_job_group(group_id: int, db: Session = Depends(get_db)):
    job_group = db.query(JobGroup).filter(JobGroup.id == group_id).first()
    if job_group is None:
        raise HTTPException(status_code=404, detail="Job group not found")
    return job_group

@router.put("/{group_id}/cancel")
def cancel_job_group(group_id: int, db: Session = Depends(get_db)):
    job_group = db.query(JobGroup).filter(JobGroup.id == group_id).first()
    if job_group is None:
        raise HTTPException(status_code=404, detail="Job group not found")
    
    if job_group.status == "completed":
        raise HTTPException(status_code=400, detail="Cannot cancel completed job group")
    
    job_group.status = "cancelled"
    job_group.completed_at = datetime.now()
    
    db.query(Job).filter(
        Job.group_id == group_id,
        Job.status.in_(["pending", "running"])
    ).update({"status": "cancelled", "completed_at": datetime.now()})
    
    db.commit()
    return {"message": "Job group cancelled"}

@router.get("/{group_id}/status")
def get_job_group_status(group_id: int, db: Session = Depends(get_db)):
    job_group = db.query(JobGroup).filter(JobGroup.id == group_id).first()
    if job_group is None:
        raise HTTPException(status_code=404, detail="Job group not found")
    
    jobs = db.query(Job).filter(Job.group_id == group_id).all()
    status_counts = {
        "total": len(jobs),
        "pending": sum(1 for job in jobs if job.status == "pending"),
        "running": sum(1 for job in jobs if job.status == "running"),
        "completed": sum(1 for job in jobs if job.status == "completed"),
        "cancelled": sum(1 for job in jobs if job.status == "cancelled"),
        "failed": sum(1 for job in jobs if job.status == "failed")
    }
    
    device_ids = [job.device_id for job in jobs]
    devices = db.query(Device).filter(Device.id.in_(device_ids)).all()
    
    return {
        "group_status": job_group.status,
        "job_stats": status_counts,
        "created_at": job_group.created_at,
        "started_at": job_group.started_at,
        "completed_at": job_group.completed_at,
        "devices": [
            {
                "device_id": device.id,
                "name": device.name,
                "status": device.status
            }
            for device in devices
        ]
    }