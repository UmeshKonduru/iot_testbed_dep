from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..schemas.schemas import GatewayCreate, GatewaySchema, GatewayHeartbeat
from ..services.gateway_service import create_gateway_service, gateway_heartbeat_service

router = APIRouter(
    prefix="/gateways",
    tags=["gateways"]
)

@router.post("/", response_model=GatewaySchema)
def create_gateway(gateway: GatewayCreate, db: Session = Depends(get_db)):
    try:
        return create_gateway_service(gateway, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{gateway_id}/heartbeat")
def gateway_heartbeat(gateway_id: int, heartbeat: GatewayHeartbeat, db: Session = Depends(get_db)):
    try:
        return gateway_heartbeat_service(gateway_id, heartbeat.active_device_ids, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
