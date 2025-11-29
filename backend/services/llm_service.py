import os
from agents.extensions.models.litellm_model import LitellmModel
from dotenv import load_dotenv

load_dotenv()

def get_gemini_model():
    """
    Initializes and returns a Gemini-powered agent model using LiteLLM.
    
    Optimization Note: For performance at scale (SC-001, SC-002), consider:
    - Caching model instances or responses for repeated queries.
    - Implementing asynchronous model invocation if not already handled by LiteLLM.
    - Exploring LiteLLM's advanced features for load balancing or model routing.
    - Fine-tuning the Gemini model for specific book-related tasks to improve relevance and speed.
    """
    gemini_api_key = os.environ.get("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set.")

    return LitellmModel(
        model="gemini/gemini-pro",  # Using a common Gemini model, adjust as needed
        api_key=gemini_api_key
    )
