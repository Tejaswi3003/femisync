import pandas as pd

from backend.services.checkin_service import get_raw_checkins


def generate_trend_data(window="all"):
    logs = get_raw_checkins()

    if len(logs) == 0:
        return {
            "message": "No trend data available"
        }

    df = pd.DataFrame(logs)

    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date")

    if window != "all":
        latest_date = df["date"].max()
        cutoff_date = latest_date - pd.Timedelta(days=int(window) - 1)

        df = df[df["date"] >= cutoff_date]

    df["sleep_rolling_avg"] = (
        df["sleep_hours"]
        .rolling(window=3, min_periods=1)
        .mean()
        .round(2)
    )

    df["stress_rolling_avg"] = (
        df["stress_score"]
        .rolling(window=3, min_periods=1)
        .mean()
        .round(2)
    )

    df["fatigue_rolling_avg"] = (
        df["fatigue_score"]
        .rolling(window=3, min_periods=1)
        .mean()
        .round(2)
    )

    df["cramps_rolling_avg"] = (
    df["cramps_score"]
    .rolling(window=3, min_periods=1)
    .mean()
    .round(2)
    )

    df["flow_rolling_avg"] = (
        df["flow_intensity"]
        .rolling(window=3, min_periods=1)
        .mean()
        .round(2)
    )

    df["hot_flashes_rolling_avg"] = (
        df["hot_flashes"]
        .rolling(window=3, min_periods=1)
        .mean()
        .round(2)
    )

    df["sleep_disruption_rolling_avg"] = (
        df["sleep_disruption"]
        .rolling(window=3, min_periods=1)
        .mean()
        .round(2)
    )

    return {
        "sleep_trend": [
            {
                "date": row["date"].strftime("%Y-%m-%d"),
                "value": row["sleep_rolling_avg"]
            }
            for _, row in df.iterrows()
        ],

        "stress_trend": [
            {
                "date": row["date"].strftime("%Y-%m-%d"),
                "value": row["stress_rolling_avg"]
            }
            for _, row in df.iterrows()
        ],

        "fatigue_trend": [
            {
                "date": row["date"].strftime("%Y-%m-%d"),
                "value": row["fatigue_rolling_avg"]
            }
            for _, row in df.iterrows()
        ],

        "cramps_trend": [
    {
        "date": row["date"].strftime("%Y-%m-%d"),
        "value": row["cramps_rolling_avg"]
    }
    for _, row in df.iterrows()
    ],

    "flow_trend": [
        {
            "date": row["date"].strftime("%Y-%m-%d"),
            "value": row["flow_rolling_avg"]
        }
        for _, row in df.iterrows()
    ],

    "hot_flashes_trend": [
        {
            "date": row["date"].strftime("%Y-%m-%d"),
            "value": row["hot_flashes_rolling_avg"]
        }
        for _, row in df.iterrows()
    ],

    "sleep_disruption_trend": [
        {
            "date": row["date"].strftime("%Y-%m-%d"),
            "value": row["sleep_disruption_rolling_avg"]
        }
        for _, row in df.iterrows()
    ]
    }