from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..schemas.schemas import JobGroupCreate, JobGroupSchema
from ..services.job_group_service import (
    create_job_group_service,
    get_queue_status_service,
    get_job_groups_service,
    get_job_group_service,
    cancel_job_group_service,
    get_job_group_status_service,
)

router = APIRouter(
    prefix="/job-groups",
    tags=["job groups"]
)

@router.post("/", response_model=JobGroupSchema)
def create_job_group(job_group: JobGroupCreate, db: Session = Depends(get_db)):
    try:
        return create_job_group_service(job_group, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/queue")
def get_queue_status(db: Session = Depends(get_db)):
    return get_queue_status_service(db)

@router.get("/", response_model=List[JobGroupSchema])
def get_job_groups(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_job_groups_service(db, skip, limit)

@router.get("/{group_id}", response_model=JobGroupSchema)
def get_job_group(group_id: int, db: Session = Depends(get_db)):
    try:
        return get_job_group_service(group_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{group_id}/cancel")
def cancel_job_group(group_id: int, db: Session = Depends(get_db)):
    try:
        return cancel_job_group_service(group_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{group_id}/status")
def get_job_group_status(group_id: int, db: Session = Depends(get_db)):
    try:
        return get_job_group_status_service(group_id, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))