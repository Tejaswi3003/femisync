from backend.services.checkin_service import get_raw_checkins

def calculate_basic_analytics():
    logs = get_raw_checkins()

    if len(logs) == 0:
        return {
            "message": "No check-ins available yet",
            "total_entries": 0
        }
    total_entries = len(logs)

    average_sleep = sum(log["sleep_hours"] for log in logs) / total_entries
    average_stress = sum(log["stress_score"] for log in logs) / total_entries
    average_mood = sum(log["mood_score"] for log in logs) / total_entries
    average_energy = sum(log["energy_score"] for log in logs) / total_entries
    average_fatigue = sum(log["fatigue_score"] for log in logs) / total_entries

    high_stress_days = sum(
        1 for log in logs if log["stress_score"] >=7
    )

    low_sleep_days = sum(
        1 for log in logs if log["sleep_hours"] < 6
    )

    high_fatigue_days = sum(
        1 for log in logs if log["fatigue_score"] >= 7
    )

    cramps_days = sum(
        1 for log in logs if log["cramps_score"] > 0
    )

    return {
        "total_entries": total_entries,
        "average_sleep": round(average_sleep, 2),
        "average_stress": round(average_stress, 2),
        "average_mood": round(average_mood, 2),
        "average_energy": round(average_energy, 2),
        "average_fatigue": round(average_fatigue, 2),
        "high_stress_days": high_stress_days,
        "low_sleep_days": low_sleep_days,
        "high_fatigue_days": high_fatigue_days,
        "cramps_days": cramps_days
    }
