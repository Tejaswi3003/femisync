from backend.services.analytics_service import calculate_basic_analytics
from backend.services.cycle_service import calculate_cycle_analytics


def get_window_label(window):
    if window == "7":
        return "the last 7 days"
    if window == "30":
        return "the last 30 days"
    return "your available logs"


def generate_insights(window="all"):
    analytics = calculate_basic_analytics(window)
    cycle_analytics = calculate_cycle_analytics()

    if analytics.get("total_entries", 0) == 0:
        return {
            "window": window,
            "summary": "No wellness data is available yet.",
            "insights": [
                "Start logging daily wellness check-ins to unlock personalized patterns."
            ]
        }

    window_label = get_window_label(window)
    insights = []

    correlations = analytics["correlations"]

    sleep_fatigue_corr = correlations["sleep_fatigue"]
    stress_mood_corr = correlations["stress_mood"]
    stress_fatigue_corr = correlations["stress_fatigue"]

    average_sleep = analytics["average_sleep"]
    average_stress = analytics["average_stress"]
    average_fatigue = analytics["average_fatigue"]
    average_sleep_disruption = analytics.get("average_sleep_disruption", 0)
    average_hot_flashes = analytics.get("average_hot_flashes", 0)
    average_night_sweats = analytics.get("average_night_sweats", 0)
    average_cramps = analytics.get("average_cramps", 0)
    average_flow = analytics.get("average_flow_intensity", 0)

    if sleep_fatigue_corr is not None and sleep_fatigue_corr < -0.6:
        insights.append(
            f"Across {window_label}, lower sleep appears strongly linked with higher fatigue."
        )

    if stress_mood_corr is not None and stress_mood_corr < -0.6:
        insights.append(
            f"Across {window_label}, higher stress appears associated with lower mood scores."
        )

    if stress_fatigue_corr is not None and stress_fatigue_corr > 0.6:
        insights.append(
            f"Across {window_label}, higher stress appears connected with increased fatigue."
        )

    if average_sleep < 6:
        insights.append(
            f"Average sleep is below 6 hours in {window_label}, which may be affecting energy levels."
        )

    if average_stress >= 7:
        insights.append(
            f"Stress levels are consistently high in {window_label}."
        )

    if average_fatigue >= 7:
        insights.append(
            f"Fatigue levels are elevated in {window_label}."
        )

    if average_cramps >= 5:
        insights.append(
            f"Cramps appear moderate to high during {window_label}."
        )

    if average_flow >= 3:
        insights.append(
            f"Flow intensity appears moderate to high during logged period days in {window_label}."
        )

    if average_sleep_disruption >= 4:
        insights.append(
            f"Sleep disruption appears noticeable in {window_label}."
        )

    if average_hot_flashes >= 0.5:
        insights.append(
            f"Hot flashes appear repeatedly in {window_label}."
        )

    if average_night_sweats >= 0.5:
        insights.append(
            f"Night sweats appear repeatedly in {window_label}."
        )

    if cycle_analytics.get("average_cycle_length") is not None:
        cycle_length = cycle_analytics["average_cycle_length"]
        regularity = cycle_analytics.get("cycle_regularity")

        if regularity == "regular":
            insights.append(
                f"Detected cycle lengths average about {cycle_length} days and appear fairly consistent."
            )
        elif regularity == "irregular":
            insights.append(
                f"Detected cycle lengths average about {cycle_length} days, with noticeable variation."
            )

    if len(insights) == 0:
        insights.append(
            f"Wellness patterns in {window_label} appear relatively balanced based on available logs."
        )

    summary = build_summary(insights, window_label)

    return {
        "window": window,
        "summary": summary,
        "insights": insights[:5]
    }


def build_summary(insights, window_label):
    if len(insights) == 0:
        return f"Your wellness patterns in {window_label} appear balanced."

    if len(insights) == 1:
        return insights[0]

    return f"Femisync found {len(insights)} notable wellness pattern(s) across {window_label}."