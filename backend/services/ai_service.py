import os

from dotenv import load_dotenv
from google import genai

from backend.services.analytics_service import calculate_basic_analytics
from backend.services.cycle_service import calculate_cycle_analytics
from backend.services.insight_service import generate_insights


load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def clean_ai_text(text: str):
    return " ".join(text.split())


def generate_ai_insights(window="all"):
    analytics = calculate_basic_analytics(window)
    cycle_analytics = calculate_cycle_analytics()
    insights_data = generate_insights(window)

    prompt = f"""
    You are a professional wellness insight assistant for Femisync, a women's wellness analytics platform.

    Use the structured analytics below to synthesize one concise wellness summary.

    Requirements:
    - Keep the tone supportive, calm, encouraging, and professional.
    - Sound like a modern wellness application, not a medical report.
    - Mention positive observations when available without hiding concerning patterns.
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

    except Exception:
        summary = insights_data.get(
            "summary",
            "Femisync found wellness patterns based on your available logs."
        )

    return {
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
        }
    }