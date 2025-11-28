import json
import os
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Define the path to the mock RAG storage
RAG_STORAGE_PATH = os.path.join(os.path.dirname(__file__), "..", "rag_storage.json")

# Load the mock RAG data
def load_rag_data():
    try:
        with open(RAG_STORAGE_PATH, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: RAG storage file not found at {RAG_STORAGE_PATH}")
        return []

RAG_DATA = load_rag_data()

@router.get("/chapters")
async def get_chapters():
    """
    Returns a list of all chapters with their IDs and titles.
    """
    chapter_metadata = []
    for i, chapter in enumerate(RAG_DATA):
        chapter_metadata.append({"id": str(i + 1), "title": chapter["title"]})
    return chapter_metadata

@router.get("/chapters/{id}")
async def get_chapter(id: str):
    """
    Returns the content of a specific chapter by ID.
    """
    try:
        chapter_id = int(id)
        if 1 <= chapter_id <= len(RAG_DATA):
            chapter = RAG_DATA[chapter_id - 1]
            return {"id": id, "title": chapter["title"], "content": chapter["content"]}
        raise HTTPException(status_code=404, detail="Chapter not found")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid chapter ID")
