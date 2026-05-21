from backend.services.analytics_service import calculate_basic_analytics


def generate_insights():
    analytics = calculate_basic_analytics()

    if analytics.get("total_entries", 0) == 0:
        return {
            "insights": [
                "No wellness data available yet."
            ]
        }

    insights = []

    average_sleep = analytics["average_sleep"]
    average_stress = analytics["average_stress"]
    average_fatigue = analytics["average_fatigue"]

    correlations = analytics["correlations"]

    sleep_fatigue_corr = correlations["sleep_fatigue"]
    stress_mood_corr = correlations["stress_mood"]
    stress_fatigue_corr = correlations["stress_fatigue"]

    if average_sleep < 6:
        insights.append(
            "Average sleep levels appear lower than recommended."
        )

    if average_stress >= 7:
        insights.append(
            "Higher stress levels were frequently observed."
        )

    if average_fatigue >= 7:
        insights.append(
            "Fatigue levels appear consistently elevated."
        )

    if sleep_fatigue_corr is not None and sleep_fatigue_corr < -0.6:
        insights.append(
            "Lower sleep patterns appear associated with increased fatigue."
        )

    if stress_mood_corr is not None and stress_mood_corr < -0.6:
        insights.append(
            "Higher stress levels may be associated with lower mood scores."
        )

    if stress_fatigue_corr is not None and stress_fatigue_corr > 0.6:
        insights.append(
            "Higher stress patterns appear associated with increased fatigue."
        )

    if len(insights) == 0:
        insights.append(
            "Current wellness patterns appear relatively balanced."
        )

    return {
        "insights": insights
    }