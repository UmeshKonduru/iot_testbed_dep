from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..database import get_db
from ..models.models import Device
from ..schemas.schemas import DeviceCreate, Device as DeviceSchema

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
)

@router.post("/", response_model=DeviceSchema)
def create_device(device: DeviceCreate, db: Session = Depends(get_db)):
    db_device = Device(
        name=device.name,
        status="offline",
        last_seen=datetime.now()
    )
    db.add(db_device)
    try:
        db.commit()
        db.refresh(db_device)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    return db_device

@router.get("/", response_model=List[DeviceSchema])
def get_devices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Device).offset(skip).limit(limit).all()

@router.get("/{device_id}", response_model=DeviceSchema)
def get_device(device_id: int, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    return device

@router.put("/{device_id}", response_model=DeviceSchema)
def update_device_status(device_id: int, status: str, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    
    if status not in ["available", "busy", "offline"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    device.status = status
    device.last_seen = datetime.now()
    db.commit()
    db.refresh(device)
    return device

@router.delete("/{device_id}")
def delete_device(device_id: int, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    
    db.delete(device)
    db.commit()
    return {"message": "Device deleted"}

# Endpoint for devices to update their heartbeat
@router.post("/{device_id}/heartbeat", response_model=DeviceSchema)
def update_device_heartbeat(device_id: int, db: Session = Depends(get_db)):
    device = db.query(Device).filter(Device.id == device_id).first()
    if device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    
    device.last_seen = datetime.now()
    if device.status == "offline":
        device.status = "available"
    
    db.commit()
    db.refresh(device)
    return device