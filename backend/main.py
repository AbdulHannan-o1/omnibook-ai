from fastapi import FastAPI
from pydantic import BaseModel
from backend.agents.chatbot_agent import run_agent
from typing import Optional
from backend.utils.observability import logger

app = FastAPI()

# Scalability Considerations (FR-007, SC-001, SC-002):
# For 11-100 concurrent users, consider the following:
# 1. Deployment Strategy:
#    - Use a production-ready ASGI server (e.g., Gunicorn with Uvicorn workers).
#    - Deploy on a container orchestration platform (e.g., Kubernetes) for auto-scaling.
# 2. Resource Allocation:
#    - Monitor CPU/Memory usage and scale resources (vertical or horizontal) as needed.
#    - Optimize Python application for concurrency (e.g., efficient async operations).
# 3. LLM API Rate Limits:
#    - Implement rate limiting and retry mechanisms for calls to the Gemini API.
#    - Consider a LiteLLM proxy or a custom caching layer for frequent LLM requests.
# 4. Database/State Management:
#    - If session state becomes persistent, use a scalable database solution (e.g., PostgreSQL, Redis).
# 5. Frontend Optimization:
#    - Ensure efficient handling of concurrent requests from the frontend.

class ChatbotRequest(BaseModel):
    message: str
    context: Optional[str] = None

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed.")
    return {"Hello": "World"}

@app.post("/chatbot")
async def chat(request: ChatbotRequest):
    logger.info(f"Chatbot request received: message='{request.message}', context='{request.context}'")
    full_message = request.message
    if request.context:
        full_message = f"Context: {request.context}\n{request.message}"
    response = await run_agent(full_message)
    logger.info(f"Chatbot response sent: '{response}'")
    return {"response": response}