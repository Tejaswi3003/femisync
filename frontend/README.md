# Femisync

Femisync is an AI-powered women’s wellness platform designed to help users track daily wellness patterns, menstrual cycle symptoms, menopause-related symptoms, mood, stress, sleep, energy, and fatigue.

The goal is not to diagnose medical conditions, but to help users understand wellness trends through tracking, analytics, and AI-generated insights.

## Features

- Personalized onboarding flow
- Dynamic wellness check-in form
- Menstrual cycle tracking mode
- Menopause/perimenopause tracking mode
- General wellness tracking mode
- Mood, stress, energy, fatigue, and sleep tracking
- Calendar date picker
- Symptom selection
- Notes input
- Responsive pastel UI design
- Frontend payload aligned with backend API contract

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS
- React Datepicker

### Backend
- FastAPI
- Python
- Pydantic
- Analytics/AI integration

## Project Structure

```bash
femisync/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── App.css
│   └── package.json
└── README.md


Frontend Setup
cd frontend
npm install
npm run dev

Open:

http://localhost:5173
