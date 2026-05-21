from pydantic import BaseModel
from typing import Optional


class WellnessCheckIn(BaseModel):
    date: str

    # General wellness
    sleep_hours: float
    stress_score: int
    mood_score: int
    energy_score: int
    fatigue_score: int

    # Cycle tracking
    period_status: Optional[bool] = False
    flow_intensity: Optional[int] = 0
    cycle_day: Optional[int] = 0
    cramps_score: Optional[int] = 0

    # Menopause / perimenopause symptoms
    hot_flashes: Optional[int] = 0
    night_sweats: Optional[int] = 0
    sleep_disruption: Optional[int] = 0
    brain_fog: Optional[int] = 0
    mood_swings: Optional[int] = 0

    notes: Optional[str] = ""