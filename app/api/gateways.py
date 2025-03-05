from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.schemas import GatewayCreate, GatewayRegister, GatewayHeartbeat, GatewaySchema, UserSchema
from ..services.gateway_service import verify_gateway_service, create_gateway_service, gateway_heartbeat_service
from .auth import get_current_user_dependency

router = APIRouter(
    prefix="/gateways",
    tags=["gateways"]
)

@router.post("/", response_model=GatewayRegister)
def create_gateway(
    gateway: GatewayCreate,
    db: Session = Depends(get_db),
    current_user: UserSchema = Depends(get_current_user_dependency)
):
    try:
        return create_gateway_service(gateway, db)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/register", response_model=GatewaySchema)
def register_gateway(verify: GatewayRegister, db: Session = Depends(get_db)):
    try:
        return verify_gateway_service(verify, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/{gateway_id}/heartbeat")
def gateway_heartbeat(gateway_id: int, heartbeat: GatewayHeartbeat, db: Session = Depends(get_db)):
    try:
        return gateway_heartbeat_service(gateway_id, heartbeat.active_device_ids, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
