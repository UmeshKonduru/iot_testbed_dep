from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..schemas.schemas import JobSchema, JobStatusUpdate
from ..services.job_service import JobService

router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)

@router.get("/", response_model=List[JobSchema])
def get_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        return JobService.get_jobs_service(db, skip, limit)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{job_id}", response_model=JobSchema)
def get_job(job_id: int, db: Session = Depends(get_db)):
    try:
        return JobService.get_job_service(job_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{job_id}/status")
def update_job_status(job_id: int, status_update: JobStatusUpdate, db: Session = Depends(get_db)):
    try:
        return JobService.update_job_status_service(job_id, status_update, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))