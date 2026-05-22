# Femisync 🌸

AI-powered women’s wellness platform for cycle, symptom, and menopause insights.

## Overview

Femisync is a full-stack HealthTech platform that helps users track wellness patterns through daily check-ins and AI-powered insights.

Users can log:
- Sleep
- Mood
- Stress
- Energy
- Fatigue
- Period tracking
- Flow intensity
- Cramps
- Menopause/perimenopause symptoms
- Personal wellness notes

The platform transforms this data into analytics dashboards, trend visualizations, cycle insights, symptom tracking, and AI-generated wellness summaries.

---

## Features

- Daily wellness check-ins
- Cycle tracking
- Menopause/perimenopause symptom tracking
- AI-generated wellness summaries
- Analytics dashboard
- Trend visualization
- Symptom frequency charts
- Responsive wellness-focused UI

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS
- Recharts

### Backend
- FastAPI
- Python

### AI
- Gemini API

---

## Project Structure

```text
Femisync/
│
├── backend/
├── frontend/
├── .env.example
└── README.md
```

---

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/yourusername/femisync.git
cd femisync
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```text
http://localhost:5173
```

---

## Backend Setup

### Create Virtual Environment

```bash
cd backend
python -m venv venv
```

### Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on:
```text
http://localhost:8000
```

---

## Environment Variables

Create a `.env` file using `.env.example`

Example:

```env
GEMINI_API_KEY=your_api_key
```

---

## API Data Model

```python
class WellnessCheckIn(BaseModel):
    date: str

    sleep_hours: float
    stress_score: int
    mood_score: int
    energy_score: int
    fatigue_score: int

    period_status: Optional[bool] = False
    flow_intensity: Optional[int] = 0
    cycle_day: Optional[int] = 0
    cramps_score: Optional[int] = 0

    hot_flashes: Optional[int] = 0
    night_sweats: Optional[int] = 0
    sleep_disruption: Optional[int] = 0
    brain_fog: Optional[int] = 0
    mood_swings: Optional[int] = 0

    notes: Optional[str] = ""
```

---

## License

Created for ALGOfest Hackathon 2026.