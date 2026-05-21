from fastapi import APIRouter
from backend.models.wellness import WellnessCheckIn
from backend.services.checkin_service import save_checkin, get_all_checkins

router = APIRouter()
wellness_logs = []

@router.post("/checkin")
def create_checkin(checkin: WellnessCheckIn):
    return save_checkin(checkin)

@router.get("/checkins")
def get_checkins():
    return get_all_checkins()
