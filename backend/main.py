from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import rag, chapters

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rag.router)
app.include_router(chapters.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}
