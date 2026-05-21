from fastapi import APIRouter, Query
from backend.services.insight_service import generate_insights

router = APIRouter(tags=["Insights"])


@router.get("/insights")
def get_insights(window: str = Query("all")):
    return generate_insights(window)