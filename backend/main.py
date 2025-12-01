from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from backend.agents.chatbot_agent import run_agent
from typing import Optional, Dict, Any
from backend.db.schema import UserPreferences
from backend.utils.observability import logger

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

user_preferences: Dict[str, Dict[str, Dict[str, Any]]] = {}

app = FastAPI()

class ChatbotRequest(BaseModel):
    message: str
    context: Optional[str] = None

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed.")
    return {"Hello": "World"}

@app.get("/api/v1/personalization/{user_id}/{chapter_id}", response_model=UserPreferences)
async def get_user_preferences(user_id: str, chapter_id: str) -> UserPreferences:
    logger.info(f"Getting user preferences for user {user_id}, chapter {chapter_id}")
    try:
        if user_id in user_preferences and chapter_id in user_preferences[user_id]:
            return UserPreferences(**user_preferences[user_id][chapter_id])
        return UserPreferences(user_id=user_id, chapter_id=chapter_id)
    except Exception as e:
        logger.error(f"Error retrieving user preferences for user {user_id}, chapter {chapter_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.put("/api/v1/personalization/{user_id}/{chapter_id}")
async def update_user_preferences(user_id: str, chapter_id: str, prefs: UserPreferences):
    logger.info(f"Updating user preferences for user {user_id}, chapter {chapter_id}")
    try:
        if user_id not in user_preferences:
            user_preferences[user_id] = {}
        user_preferences[user_id][chapter_id] = prefs.dict()
        return {"message": "Preferences updated"}
    except Exception as e:
        logger.error(f"Error updating user preferences for user {user_id}, chapter {chapter_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/api/v1/personalization/{user_id}/{chapter_id}/highlights")
async def add_highlight(user_id: str, chapter_id: str, highlight: Dict[str, Any]):
    logger.info(f"Adding highlight for user {user_id}, chapter {chapter_id}")
    try:
        if user_id not in user_preferences:
            user_preferences[user_id] = {}
        if chapter_id not in user_preferences[user_id]:
            user_preferences[user_id][chapter_id] = UserPreferences(user_id=user_id, chapter_id=chapter_id).dict()
        
        user_preferences[user_id][chapter_id]["highlights"].append(highlight)
        return {"message": "Highlight added"}
    except Exception as e:
        logger.error(f"Error adding highlight for user {user_id}, chapter {chapter_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/api/v1/personalization/{user_id}/{chapter_id}/annotations")
async def add_annotation(user_id: str, chapter_id: str, annotation: Dict[str, Any]):
    logger.info(f"Adding annotation for user {user_id}, chapter {chapter_id}")
    try:
        if user_id not in user_preferences:
            user_preferences[user_id] = {}
        if chapter_id not in user_preferences[user_id]:
            user_preferences[user_id][chapter_id] = UserPreferences(user_id=user_id, chapter_id=chapter_id).dict()
            
        user_preferences[user_id][chapter_id]["annotations"].append(annotation)
        return {"message": "Annotation added"}
    except Exception as e:
        logger.error(f"Error adding annotation for user {user_id}, chapter {chapter_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/api/v1/personalization/{user_id}/{chapter_id}/progress")
async def update_chapter_progress(user_id: str, chapter_id: str, progress: Dict[str, Any]):
    logger.info(f"Updating chapter progress for user {user_id}, chapter {chapter_id}")
    try:
        if user_id not in user_preferences:
            user_preferences[user_id] = {}
        if chapter_id not in user_preferences[user_id]:
            user_preferences[user_id][chapter_id] = UserPreferences(user_id=user_id, chapter_id=chapter_id).dict()
        
        section_id = progress.get("sectionId")
        completed = progress.get("completed")

        if section_id:
            if completed:
                if section_id not in user_preferences[user_id][chapter_id]["completed_sections"]:
                    user_preferences[user_id][chapter_id]["completed_sections"].append(section_id)
            else:
                if section_id in user_preferences[user_id][chapter_id]["completed_sections"]:
                    user_preferences[user_id][chapter_id]["completed_sections"].remove(section_id)

        return {"message": "Progress updated"}
    except Exception as e:
        logger.error(f"Error updating chapter progress for user {user_id}, chapter {chapter_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/api/v1/chatbot/chat")
async def chat(request: ChatbotRequest, token: str = Depends(oauth2_scheme)):
    try:
        logger.info(f"Chatbot request received: message='{request.message}', context='{request.context}'")
        full_message = request.message
        if request.context:
            full_message = f"Context: {request.context}\n{request.message}"
        response = await run_agent(full_message)
        logger.info(f"Chatbot response sent: '{response}'")
        return {"response": response}
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")