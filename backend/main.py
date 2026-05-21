from fastapi import FastAPI
from backend.routes.checkin import router as checkin_router
from backend.routes.analytics import router as analytics_router
from backend.routes.insights import router as insights_router

app = FastAPI()

app.include_router(checkin_router)
app.include_router(analytics_router)
app.include_router(insights_router)

@app.get("/")
def home():
    return {"message": "Femisync backend running successfully"}