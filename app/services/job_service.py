from sqlalchemy.orm import Session
from datetime import datetime, timezone

from ..models.models import Job, JobGroup, Device, JobStatus, DeviceStatus
from ..schemas.schemas import JobStatusUpdate

class JobService:

    @staticmethod
    def get_jobs_service(db: Session, skip: int = 0, limit: int = 100):
        return db.query(Job).offset(skip).limit(limit).all()

    @staticmethod
    def get_job_service(job_id: int, db: Session):
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job:
            raise Exception("Job not found")
        return job

    @staticmethod
    def update_job_status_service(job_id: int, status_update: JobStatusUpdate, db: Session):
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job:
            raise Exception("Job not found")
        
        job.status = status_update.status
        if status_update.output_file_id is not None:
            job.output_file_id = status_update.output_file_id
        
        if status_update.status in [JobStatus.completed, JobStatus.failed, JobStatus.cancelled]:
            job.completed_at = datetime.now(timezone.utc)
            
            device = db.query(Device).filter(Device.id == job.device_id).first()
            if device:
                device.status = DeviceStatus.available
                device.last_seen = datetime.now(timezone.utc)
                
            group = db.query(JobGroup).filter(JobGroup.id == job.group_id).first()
            if group:
                all_jobs = db.query(Job).filter(Job.group_id == group.id).all()
                all_completed = all(j.status in [JobStatus.completed, JobStatus.failed, JobStatus.cancelled] for j in all_jobs)
                
                if all_completed:
                    group.status = JobStatus.completed
                    group.completed_at = datetime.now(timezone.utc)
                    if any(j.status == JobStatus.failed for j in all_jobs):
                        group.status = JobStatus.failed
                    elif any(j.status == JobStatus.cancelled for j in all_jobs):
                        group.status = JobStatus.cancelled
        try:
            db.commit()
        except Exception as e:
            db.rollback()
            raise Exception(str(e))
        
        return {"message": "Job status updated successfully"}