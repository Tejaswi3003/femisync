from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.checkin import router as checkin_router
from backend.routes.analytics import router as analytics_router
from backend.routes.insights import router as insights_router
from backend.routes.trends import router as trends_router
from backend.routes.cycle import router as cycle_router
from backend.routes.seed import router as seed_router
from backend.routes.ai import router as ai_router


app = FastAPI(
    title="Femisync Backend",
    description="Backend APIs for Femisync wellness tracking, analytics, trends, cycle insights, and AI summaries.",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(checkin_router)
app.include_router(analytics_router)
app.include_router(insights_router)
app.include_router(trends_router)
app.include_router(cycle_router)
app.include_router(seed_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "Femisync backend running successfully"
    }