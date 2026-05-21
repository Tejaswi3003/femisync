from fastapi import APIRouter, Query

from backend.services.ai_service import generate_ai_insights

router = APIRouter(tags=["AI Insights"])


@router.get("/ai-insights")
def get_ai_insights(window: str = Query("all")):
    return generate_ai_insights(window)