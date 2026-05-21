import pandas as pd

from backend.services.checkin_service import get_raw_checkins


def calculate_cycle_analytics():
    logs = get_raw_checkins()

    if len(logs) == 0:
        return {
            "message": "No cycle data available",
            "total_entries": 0
        }

    df = pd.DataFrame(logs)

    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date").reset_index(drop=True)

    period_df = df[df["period_status"] == True]

    if len(period_df) == 0:
        return {
            "message": "No period days logged yet",
            "total_entries": len(df),
            "period_days": 0
        }

    period_days = len(period_df)
    average_flow_intensity = round(period_df["flow_intensity"].mean(), 2)
    average_cramps_during_period = round(period_df["cramps_score"].mean(), 2)

    period_start_dates = []
    period_durations = []

    current_period_start = None
    current_period_length = 0
    previous_period_status = False

    for _, row in df.iterrows():
        is_period_day = row["period_status"] == True

        if is_period_day and not previous_period_status:
            current_period_start = row["date"]
            current_period_length = 1
            period_start_dates.append(row["date"])

        elif is_period_day and previous_period_status:
            current_period_length += 1

        elif not is_period_day and previous_period_status:
            period_durations.append(current_period_length)
            current_period_start = None
            current_period_length = 0

        previous_period_status = is_period_day

    if current_period_length > 0:
        period_durations.append(current_period_length)

    cycle_lengths = []

    for i in range(1, len(period_start_dates)):
        difference = (
            period_start_dates[i] - period_start_dates[i - 1]
        ).days

        cycle_lengths.append(difference)

    average_cycle_length = (
        round(sum(cycle_lengths) / len(cycle_lengths), 2)
        if len(cycle_lengths) > 0
        else None
    )

    cycle_regularity = "not enough data"

    if len(cycle_lengths) >= 2:
        max_cycle = max(cycle_lengths)
        min_cycle = min(cycle_lengths)

        if max_cycle - min_cycle <= 7:
            cycle_regularity = "regular"
        else:
            cycle_regularity = "irregular"

    return {
        "total_entries": len(df),
        "period_days": period_days,
        "average_flow_intensity": average_flow_intensity,
        "average_cramps_during_period": average_cramps_during_period,
        "period_start_dates": [
            date.strftime("%Y-%m-%d") for date in period_start_dates
        ],
        "period_durations": period_durations,
        "cycle_lengths": cycle_lengths,
        "average_cycle_length": average_cycle_length,
        "cycle_regularity": cycle_regularity
    }