from fastapi import APIRouter
from backend.services.cycle_service import calculate_cycle_analytics

router = APIRouter(tags=["Cycle Analytics"])


@router.get("/analytics/cycle")
def get_cycle_analytics():
    return calculate_cycle_analytics()