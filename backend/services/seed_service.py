import math
from datetime import datetime, timedelta

from backend.services.checkin_service import write_logs


def generate_demo_data():
    start_date = datetime(2026, 3, 1)
    logs = []

    period_start_offsets = [3, 32, 61]

    for day in range(90):
        current_date = start_date + timedelta(days=day)

        period_status = False
        cycle_day = 0
        flow_intensity = 0
        cramps_score = 0

        for period_start in period_start_offsets:
            if period_start <= day <= period_start + 4:
                period_status = True
                cycle_day = day - period_start + 1
                flow_intensity = max(1, 5 - abs(2 - cycle_day))
                cramps_score = max(1, 7 - abs(2 - cycle_day))
                break

        if not period_status:
            previous_starts = [p for p in period_start_offsets if p <= day]
            if previous_starts:
                cycle_day = day - max(previous_starts) + 1
            else:
                cycle_day = day + 1

        sleep_hours = round(7 + math.sin(day / 6) - (1.2 if period_status else 0), 1)
        stress_score = min(10, max(1, int(5 + math.sin(day / 5) * 2 + (2 if period_status else 0))))
        fatigue_score = min(10, max(1, int(4 + (8 - sleep_hours) + (2 if period_status else 0))))
        mood_score = min(10, max(1, int(8 - stress_score / 2 - (1 if period_status else 0))))
        energy_score = min(10, max(1, int(sleep_hours - fatigue_score / 3)))

        log = {
            "date": current_date.strftime("%Y-%m-%d"),
            "sleep_hours": sleep_hours,
            "stress_score": stress_score,
            "mood_score": mood_score,
            "energy_score": energy_score,
            "fatigue_score": fatigue_score,
            "period_status": period_status,
            "flow_intensity": flow_intensity,
            "cycle_day": cycle_day,
            "cramps_score": cramps_score,
            "hot_flashes": 1 if day % 17 == 0 else 0,
            "night_sweats": 1 if day % 23 == 0 else 0,
            "sleep_disruption": min(10, max(0, int(10 - sleep_hours))),
            "brain_fog": min(10, max(0, fatigue_score - 3)),
            "mood_swings": min(10, max(0, stress_score - 3)),
            "notes": "Demo wellness log",
            "created_at": current_date.replace(hour=9).isoformat()
        }

        logs.append(log)

    write_logs(logs)

    return {
        "message": "Demo data seeded successfully",
        "total_logs": len(logs)
    }