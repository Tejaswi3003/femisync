from fastapi import APIRouter
from backend.services.analytics_service import calculate_basic_analytics

router = APIRouter(tags=["Analytics"])

@router.get("/analytics")
def get_analytics():
    return calculate_basic_analytics()