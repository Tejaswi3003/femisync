import json
from pathlib import Path
from datetime import datetime
from backend.models.wellness import WellnessCheckIn

DATA_FILE = Path("backend/data/wellness_logs.json")

def read_logs():
    with open(DATA_FILE, "r") as file:
        return json.load(file)

def write_logs(logs):
    with open(DATA_FILE, "w") as file:
        json.dump(logs, file, indent=4)

def save_checkin(checkin: WellnessCheckIn):
    logs = read_logs()
    checkin_dict = checkin.model_dump()
    checkin_dict["created_at"] = datetime.now().isoformat()
    logs.append(checkin_dict)
    write_logs(logs)
    return {
        "message": "Check-in saved successfully",
        "total_logs": len(logs),
        "data": checkin_dict
    }

def get_all_checkins():
    logs = read_logs()
    return {
        "total_logs": len(logs),
        "data": logs
    }

def get_raw_checkins():
    return read_logs()