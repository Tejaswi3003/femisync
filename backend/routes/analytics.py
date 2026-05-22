from fastapi import APIRouter, Query
from backend.services.analytics_service import calculate_basic_analytics

router = APIRouter(tags=["Analytics"])

@router.get("/analytics")
def get_analytics(window: str = Query("all")):
    return calculate_basic_analytics(window)