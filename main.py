from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# Giả lập dữ liệu dự án (thường thì bạn sẽ lấy từ Database)
fake_projects_db = [
    {"id": 1, "title": "E-commerce Web", "tech": "React & Django", "desc": "Website bán hàng..."},
    {"id": 2, "title": "AI Chatbot", "tech": "Python & OpenAI", "desc": "Chatbot tự động..."},
    {"id": 3, "title": "3D Portfolio", "tech": "Spline & FastAPI", "desc": "Trang web bạn đang xem..."}
]

# API Endpoint: Frontend sẽ gọi vào đây để lấy danh sách dự án
@app.get("/api/projects")
async def get_projects():
    return fake_projects_db

# Cấu hình để FastAPI phục vụ các file trong thư mục 'static'
# Quan trọng: Dòng này giúp hiển thị file CSS, JS và HTML
app.mount("/static", StaticFiles(directory="static"), name="static")

# Route trang chủ: Trả về file index.html
@app.get("/")
async def read_root():
    return FileResponse('static/index.html')

# Chạy server bằng lệnh: uvicorn main:app --reload