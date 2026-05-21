from backend.models.wellness import WellnessCheckIn

wellness_logs: list[WellnessCheckIn] = []

def save_checkin(checkin: WellnessCheckIn):
    wellness_logs.append(checkin)
    return {
        "message": "Check-in saved successfully",
        "total_logs": len(wellness_logs),
        "data": checkin
    }

def get_all_checkins():
    return {
        "total_logs": len(wellness_logs),
        "data": wellness_logs
    }