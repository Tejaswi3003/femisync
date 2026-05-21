from backend.services.checkin_service import get_raw_checkins

def calculate_correlation(x_values, y_values):
    n = len(x_values)

    if n < 2:
        return None

    x_mean = sum(x_values) / n
    y_mean = sum(y_values) / n

    numerator = sum(
        (x_values[i] - x_mean) * (y_values[i] - y_mean)
        for i in range(n)
    )

    x_denominator = sum((x - x_mean) ** 2 for x in x_values)
    y_denominator = sum((y - y_mean) ** 2 for y in y_values)

    if x_denominator == 0 or y_denominator == 0:
        return None

    correlation = numerator / ((x_denominator * y_denominator) ** 0.5)

    return round(correlation, 2)

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

    sleep_values = [log["sleep_hours"] for log in logs]
    stress_values = [log["stress_score"] for log in logs]
    mood_values = [log["mood_score"] for log in logs]
    fatigue_values = [log["fatigue_score"] for log in logs]
    energy_values = [log["energy_score"] for log in logs]

    sleep_fatigue_correlation = calculate_correlation(sleep_values, fatigue_values)
    stress_mood_correlation = calculate_correlation(stress_values, mood_values)
    stress_fatigue_correlation = calculate_correlation(stress_values, fatigue_values)
    sleep_energy_correlation = calculate_correlation(sleep_values, energy_values)

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
        "cramps_days": cramps_days,
        "correlations": {
            "sleep_fatigue": sleep_fatigue_correlation,
            "stress_mood": stress_mood_correlation,
            "stress_fatigue": stress_fatigue_correlation,
            "sleep_energy": sleep_energy_correlation
        }
    }
