import pandas as pd

from backend.services.checkin_service import get_raw_checkins


def filter_by_window(df, window):
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date")

    if window == "all":
        return df

    if window not in ["7", "30"]:
        return df

    latest_date = df["date"].max()
    days = int(window)
    cutoff_date = latest_date - pd.Timedelta(days=days - 1)

    return df[df["date"] >= cutoff_date]

def calculate_correlation(df, x_column, y_column):
    if len(df) < 2:
        return None

    if df[x_column].nunique() <= 1 or df[y_column].nunique() <= 1:
        return None

    correlation = df[x_column].corr(df[y_column])
    return round(correlation, 2)

def calculate_trend(df, column_name):
    if len(df)<4:
        return "not enough data"
    midpoint = len(df) // 2

    first_half_avg = df[column_name][:midpoint].mean()
    second_half_avg = df[column_name][midpoint:].mean()

    difference = second_half_avg - first_half_avg

    if difference > 0.5:
        return "increasing"
    
    elif difference < -0.5:
        return "decreasing"
    
    else:
        return "stable"

def calculate_basic_analytics(window="all"):
    logs = get_raw_checkins()

    if len(logs) == 0:
        return {
            "message": "No check-ins available yet",
            "total_entries": 0
        }

    df = pd.DataFrame(logs)
    df = filter_by_window(df, window)

    total_entries = len(df)

    return {
        "total_entries": total_entries,

        "average_sleep": round(df["sleep_hours"].mean(), 2),
        "average_stress": round(df["stress_score"].mean(), 2),
        "average_mood": round(df["mood_score"].mean(), 2),
        "average_energy": round(df["energy_score"].mean(), 2),
        "average_fatigue": round(df["fatigue_score"].mean(), 2),

        "high_stress_days": int((df["stress_score"] >= 7).sum()),
        "low_sleep_days": int((df["sleep_hours"] < 6).sum()),
        "high_fatigue_days": int((df["fatigue_score"] >= 7).sum()),
        "cramps_days": int((df["cramps_score"] > 0).sum()),

        "correlations": {
            "sleep_fatigue": calculate_correlation(df, "sleep_hours", "fatigue_score"),
            "stress_mood": calculate_correlation(df, "stress_score", "mood_score"),
            "stress_fatigue": calculate_correlation(df, "stress_score", "fatigue_score"),
            "sleep_energy": calculate_correlation(df, "sleep_hours", "energy_score")
        },

        "trends": {
            "sleep_trend": calculate_trend(df, "sleep_hours"),
            "stress_trend": calculate_trend(df, "stress_score"),
            "fatigue_trend": calculate_trend(df, "fatigue_score"),
            "energy_trend": calculate_trend(df, "energy_score")
        }
    }