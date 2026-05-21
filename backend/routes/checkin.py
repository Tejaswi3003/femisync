from fastapi import APIRouter
from backend.models.wellness import WellnessCheckIn

router = APIRouter()
wellness_logs = []

@router.post("/checkin")
def create_checkin(checkin: WellnessCheckIn):
    wellness_logs.append(checkin)

    return {
        "message": "Check-in saved successfully",
        "total_logs": len(wellness_logs),
        "data": checkin
    }

@router.get("/checkins")
def get_checkins():
    return {
        "total_logs": len(wellness_logs),
        "data": wellness_logs
    }
