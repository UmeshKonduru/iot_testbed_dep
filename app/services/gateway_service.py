import secrets
import hashlib
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from ..models.models import Gateway, DeviceStatus, VerificationStatus
from ..schemas.schemas import GatewayCreate, GatewayRegister

def generate_token():
    return secrets.token_urlsafe(16)

def hash_token(token: str):
    return hashlib.sha256(token.encode()).hexdigest()

def verify_gateway_service(verify: GatewayRegister, db: Session):
    gateway = db.query(Gateway).filter(Gateway.name == verify.name).first()
    if not gateway:
        raise Exception("Gateway not found")
    if gateway.verification_status == VerificationStatus.verified:
        raise Exception("Gateway already verified")
    token_hash = hash_token(verify.token)
    if token_hash != gateway.token_hash:
        raise Exception("Invalid token")
    gateway.verification_status = VerificationStatus.verified
    db.commit()
    db.refresh(gateway)
    return gateway

def create_gateway_service(gateway: GatewayCreate, db: Session):
    token = generate_token()
    token_hash = hash_token(token)

    if(db.query(Gateway).filter(Gateway.name == gateway.name).first()):
        raise Exception("Gateway name already exists")
    
    db_gateway = Gateway(
        name=gateway.name,
        ip_address=gateway.ip_address,
        status=DeviceStatus.offline,
        last_seen=datetime.now(timezone.utc),
        verification_status=VerificationStatus.unverified,
        token_hash=token_hash
    )
    db.add(db_gateway)
    try:
        db.commit()
        db.refresh(db_gateway)
    except Exception as e:
        db.rollback()
        raise Exception(str(e))

    return {"name": db_gateway.name, "token": token}

def gateway_heartbeat_service(gateway_id: int, active_device_ids: list[int], db: Session):
    gateway = db.query(Gateway).filter(Gateway.id == gateway_id).first()
    if not gateway:
        raise Exception("Gateway not found")
    gateway.last_seen = datetime.now(timezone.utc)
    if gateway.status == DeviceStatus.offline:
        gateway.status = DeviceStatus.available

    devices = gateway.devices
    for device in devices:
        if device.id in active_device_ids:
            device.last_seen = datetime.now(timezone.utc)
            if device.status == DeviceStatus.offline:
                device.status = DeviceStatus.available
        else:
            device.status = DeviceStatus.offline
    db.commit()
    return {"message": "Gateway and devices heartbeat updated"}