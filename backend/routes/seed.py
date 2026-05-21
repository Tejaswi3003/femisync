from fastapi import APIRouter
from backend.services.seed_service import generate_demo_data

router = APIRouter(tags=["Demo Data"])


@router.post("/seed-demo-data")
def seed_demo_data():
    return generate_demo_data()