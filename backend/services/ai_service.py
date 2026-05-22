import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from google import genai

from backend.services.analytics_service import calculate_basic_analytics
from backend.services.cycle_service import calculate_cycle_analytics
from backend.services.insight_service import generate_insights


load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

AI_CACHE = {}
CACHE_DURATION_MINUTES = 10


def clean_ai_text(text: str):
    return " ".join(text.split())


def build_response(
    window,
    summary,
    insights_data,
    analytics,
    cycle_analytics,
    source,
    is_ai_generated,
    error=None
):
    response = {
        "window": window,
        "summary": summary,
        "base_insights": insights_data["insights"],
        "analytics_used": {
            "total_entries": analytics.get("total_entries"),
            "average_sleep": analytics.get("average_sleep"),
            "average_stress": analytics.get("average_stress"),
            "average_fatigue": analytics.get("average_fatigue"),
            "average_cycle_length": cycle_analytics.get("average_cycle_length"),
            "cycle_regularity": cycle_analytics.get("cycle_regularity")
        },
        "source": source,
        "is_ai_generated": is_ai_generated
    }

    if error:
        response["error"] = error

    return response


def create_fallback_summary(window, analytics, cycle_analytics):
    total_entries = analytics.get("total_entries", 0)
    avg_sleep = analytics.get("average_sleep")
    avg_stress = analytics.get("average_stress")
    avg_fatigue = analytics.get("average_fatigue")
    avg_cycle = cycle_analytics.get("average_cycle_length")
    cycle_regularity = cycle_analytics.get("cycle_regularity")

    window_text = {
        "7": "the last 7 days",
        "30": "the last 30 days",
        "all": "your available logs"
    }.get(str(window), "your selected time period")

    parts = []

    if total_entries:
        parts.append(
            f"Based on {window_text}, Femisync reviewed {total_entries} wellness check-ins."
        )

    if avg_sleep is not None and avg_fatigue is not None:
        parts.append(
            f"Average sleep is {avg_sleep} hours, while fatigue is averaging {avg_fatigue}/10."
        )

    if avg_stress is not None:
        parts.append(
            f"Stress is averaging {avg_stress}/10, which helps highlight how sleep, energy, and mood patterns may be connected."
        )

    if avg_cycle is not None:
        parts.append(
            f"Your cycle pattern appears {cycle_regularity}, with an average cycle length of about {avg_cycle} days."
        )

    if not parts:
        return "Femisync is ready to summarize your wellness patterns once more check-ins are logged."

    return " ".join(parts[:4])


def generate_ai_insights(window="all"):
    analytics = calculate_basic_analytics(window)
    cycle_analytics = calculate_cycle_analytics()
    insights_data = generate_insights(window)

    now = datetime.utcnow()
    cached_item = AI_CACHE.get(window)

    if cached_item:
        cached_time = cached_item["time"]
        cached_response = cached_item["response"]

        if now - cached_time < timedelta(minutes=CACHE_DURATION_MINUTES):
            return cached_response

    prompt = f"""
You are a professional wellness insight assistant for Femisync, a women's wellness analytics platform.

Use the structured analytics below to synthesize one concise wellness summary.

Requirements:
- Keep the tone supportive, calm, encouraging, and professional.
- Sound like a modern wellness application, not a medical report.
- Mention positive observations when available without hiding important patterns.
- Focus on the most meaningful wellness patterns instead of listing every symptom individually.
- Combine related observations naturally into a smooth summary.
- Prioritize trends, relationships, and overall patterns over raw metrics.
- Avoid repetitive phrasing or simply rewriting the provided insights.
- Avoid sounding alarming, judgmental, or overly dramatic.
- Do not diagnose conditions.
- Do not provide medical advice or treatment recommendations.
- Use careful wording like "appears", "may be associated", or "based on your logs".
- Avoid generic filler sentences at the end.
- Do not use greetings.
- Keep the response under 90 words.
- Return only one concise paragraph.

Window:
{window}

General analytics:
{analytics}

Cycle analytics:
{cycle_analytics}

Detected rule-based insights:
{insights_data["insights"]}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        summary = clean_ai_text(response.text)

        response_data = build_response(
            window=window,
            summary=summary,
            insights_data=insights_data,
            analytics=analytics,
            cycle_analytics=cycle_analytics,
            source="gemini",
            is_ai_generated=True
        )

        AI_CACHE[window] = {
            "time": now,
            "response": response_data
        }

        return response_data

    except Exception as error:
        print("Gemini failed:", error)

        fallback_summary = create_fallback_summary(
            window=window,
            analytics=analytics,
            cycle_analytics=cycle_analytics
        )

        return build_response(
            window=window,
            summary=fallback_summary,
            insights_data=insights_data,
            analytics=analytics,
            cycle_analytics=cycle_analytics,
            source="rule_based_fallback",
            is_ai_generated=False,
            error=str(error)
        )
