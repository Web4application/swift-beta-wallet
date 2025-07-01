from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import csv, os

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

CSV_FILE = "0x0000000000000000000000000000000000000000.csv"

@app.post("/log/burn")
async def log_burn(request: Request):
    data = await request.json()
    entry = [data.get("from"), data.get("amount"), data.get("block"), data.get("timestamp", datetime.utcnow().isoformat()), "burn"]
    file_exists = os.path.isfile(CSV_FILE)
    with open(CSV_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["address", "amount", "block", "timestamp", "type"])
        writer.writerow(entry)
    return {"status": "✅ Logged", "entry": entry}
