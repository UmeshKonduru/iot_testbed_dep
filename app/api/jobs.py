from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from ..database import get_db
from ..models.models import Job, JobGroup, Device
from ..schemas.schemas import JobCreate, Job as JobSchema, JobStatusUpdate

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)

@router.get("/", response_model=List[JobSchema])
def get_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    jobs = db.query(Job).offset(skip).limit(limit).all()
    return jobs

@router.get("/{job_id}", response_model=JobSchema)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/{job_id}/status")
async def update_job_status(job_id: int, status_update: JobStatusUpdate, db: Session = Depends(get_db)):

    try:
        job = db.query(Job).filter(Job.id == job_id).first()
        if job is None:
            raise HTTPException(status_code=404, detail="Job not found")
        
        valid_statuses = ["pending", "running", "completed", "failed", "cancelled"]
        if status_update.status not in valid_statuses:
            raise HTTPException(status_code=400, detail="Invalid status")
        
        job.status = status_update.status
        if status_update.output_file:
            job.output_file = status_update.output_file
        
        if status_update.status in ["completed", "failed", "cancelled"]:
            job.completed_at = datetime.now()
            
            device = db.query(Device).filter(Device.id == job.device_id).first()
            if device:
                device.status = "available"
                device.last_seen = datetime.now()
            group = db.query(JobGroup).filter(JobGroup.id == job.group_id).first()
            if group:
                all_jobs = db.query(Job).filter(Job.group_id == group.id).all()
                all_completed = all(j.status in ["completed", "failed", "cancelled"] for j in all_jobs)
                
                if all_completed:
                    group.status = "completed"
                    group.completed_at = datetime.now()
                    
                    if any(j.status == "failed" for j in all_jobs):
                        group.status = "failed"
                    elif any(j.status == "cancelled" for j in all_jobs):
                        group.status = "cancelled"
        db.commit()
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"message": "Job status updated successfully"}