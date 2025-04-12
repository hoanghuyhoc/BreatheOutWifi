# chạy pip install fastapi uvicorn

from fastapi import FastAPI
from subprocess import Popen
import signal
import sys, os, platform

app = FastAPI()
emotion = ""

@app.get("/")
async def return_prediction():
    with open("emotion.txt", "r") as file:
        lines = file.readlines()
        if not lines:
            emotion = ""
        else:
            emotion = lines[-1].strip()
    return {"emotion": emotion}

# chạy lệnh uvicorn api:app --reload --port 8000 --host 0.0.0.0 (api là tên file, app là tên biến FastAPI) để chạy server
# thêm một file emotion.txt với Angry, Happy, Sad, Neutral. Một thôi. Đừng kết thúc bằng dấu xuống hàng

