from fastapi import FastAPI
from backend.routes.checkin import router as checkin_router

app = FastAPI()

app.include_router(checkin_router)

@app.get("/")
def home():
    return {"message": "Femisync backend running successfully"}