from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.security import APIKeyHeader
from pydantic import BaseModel
import json
from typing import List, Optional

app = FastAPI()

import os
from dotenv import load_dotenv

load_dotenv()

# In-memory database
mps_data = []

API_KEY = os.getenv("API_KEY", "your-secret-key")  # Default for safety
api_key_header = APIKeyHeader(name="X-API-KEY", auto_error=False)

def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(status_code=403, detail="Could not validate credentials")
    return api_key

class PerformanceMetrics(BaseModel):
    attendance_percentage: int
    questions_asked: int
    mplads_fund_utilization: Optional[int] = None

class MP(BaseModel):
    id: str
    name: str
    party: str
    constituency: str
    house: str
    profile_image_url: str
    performance_metrics: PerformanceMetrics

@app.on_event("startup")
async def load_mps_data():
    global mps_data
    try:
        with open("mps.json", "r") as f:
            mps_data = json.load(f)
    except FileNotFoundError:
        mps_data = []

@app.get("/api/mps", response_model=List[MP])
async def get_mps():
    return mps_data

@app.get("/api/mps/{mp_id}", response_model=MP)
async def get_mp(mp_id: str):
    for mp in mps_data:
        if mp["id"] == mp_id:
            return mp
    raise HTTPException(status_code=404, detail="MP not found")

@app.post("/api/upload", dependencies=[Depends(get_api_key)])
async def upload_mps_data(file: UploadFile = File(...)):
    global mps_data
    if file.content_type != "application/json":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a JSON file.")

    contents = await file.read()
    try:
        new_data = json.loads(contents)
        # Validate the new data with the Pydantic model
        validated_data = [MP(**item) for item in new_data]
        mps_data = [item.dict() for item in validated_data]

        with open("mps.json", "w") as f:
            json.dump(mps_data, f, indent=2)

        return {"message": "Data uploaded and replaced successfully"}
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format.")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Data validation failed: {e}")
