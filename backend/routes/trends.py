from fastapi import APIRouter, Query
from backend.services.trend_service import generate_trend_data

router = APIRouter(tags=["Trends"])


@router.get("/analytics/trends")
def get_trends(window: str = Query("all")):
    return generate_trend_data(window)