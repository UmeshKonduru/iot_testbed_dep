from sqlalchemy.orm import Session
from datetime import datetime, timezone
from ..models.models import Gateway, Device, DeviceStatus
from ..schemas.schemas import GatewayCreate

def create_gateway_service(gateway: GatewayCreate, db: Session):
    db_gateway = Gateway(
        name=gateway.name,
        ip_address=gateway.ip_address,
        status=DeviceStatus.offline,  # initially offline
        last_seen=datetime.now(timezone.utc)
    )
    db.add(db_gateway)
    try:
        db.commit()
        db.refresh(db_gateway)
    except Exception as e:
        db.rollback()
        raise Exception(str(e))
    return db_gateway

def gateway_heartbeat_service(gateway_id: int, active_device_ids: list[int], db: Session):
    gateway = db.query(Gateway).filter(Gateway.id == gateway_id).first()
    if not gateway:
        raise Exception("Gateway not found")
    gateway.last_seen = datetime.now(timezone.utc)
    if gateway.status == DeviceStatus.offline:
        gateway.status = DeviceStatus.available

    # Update all devices registered to this gateway.
    devices = gateway.devices  # via relationship
    for device in devices:
        if device.id in active_device_ids:
            device.last_seen = datetime.now(timezone.utc)
            if device.status == DeviceStatus.offline:
                device.status = DeviceStatus.available
        else:
            device.status = DeviceStatus.offline
    db.commit()
    return {"message": "Gateway and devices heartbeat updated"}