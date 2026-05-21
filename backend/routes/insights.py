from fastapi import APIRouter
from backend.services.insight_service import generate_insights

router = APIRouter()

@router.get("/insights")
def get_insights():
    return generate_insights()