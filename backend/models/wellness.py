from pydantic import BaseModel
from typing import Optional

class WellnessCheckIn(BaseModel):
    date: str
    sleep_hours: float
    stress_score: int
    mood_score: int
    energy_score: int
    fatigue_score: int
    cramps_score: Optional[int] = 0
    hot_flashes: Optional[int] = 0
    notes: Optional[str] = ""
