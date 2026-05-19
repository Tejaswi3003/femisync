# Femisync

Femisync is an AI-powered women’s wellness intelligence platform that helps users track and understand patterns related to menstrual cycles, menopause/perimenopause symptoms, mood, sleep, stress, energy, and lifestyle habits.

Instead of focusing only on period prediction, Femisync provides wellness analytics, personalized trend insights, and AI-powered summaries to help users better understand their overall wellness patterns.

---

## Problem

Many women track symptoms manually but may not easily recognize relationships between cycle changes, stress, sleep, mood, and lifestyle habits.

Existing platforms often focus mainly on reminders and cycle prediction rather than helping users understand deeper wellness trends.

---

## Solution

Femisync transforms daily wellness check-ins into meaningful visual analytics and AI-generated insights.

Users can:
- Track cycles and symptoms
- Monitor menopause/perimenopause wellness
- Analyze stress, sleep, mood, and energy patterns
- View wellness trends through dashboards
- Receive AI-powered wellness summaries

---

## Features

- Daily wellness check-ins
- Cycle tracking
- Symptom severity tracking
- Menopause/perimenopause support
- Mood, stress, sleep, and energy tracking
- Analytics dashboard
- Trend visualization
- AI-generated wellness insights
- Correlation and pattern analysis
- Responsive modern UI

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- FastAPI
- Python
- pandas
- scikit-learn

### Tools & APIs
- GitHub
- REST APIs
- OpenAI/Gemini API (planned)

---

## Project Structure

```text
femisync/
├── frontend/      # React frontend
├── backend/       # FastAPI backend
├── docs/          # Documentation and demo assets
├── venv/          # Python virtual environment
├── README.md
└── .gitignore
```

---

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Running the Backend

Activate virtual environment:

### Git Bash

```bash
source venv/Scripts/activate
```

Run backend:

```bash
uvicorn backend.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

API docs available at:

```text
http://127.0.0.1:8000/docs
```

---

## Disclaimer

Femisync is not a medical diagnosis platform. It is designed for wellness tracking, pattern awareness, visualization, and educational insights only.