import os
from agents import Agent, Runner # Import Runner for agent execution
from agents.extensions.models.litellm_model import LitellmModel
from dotenv import load_dotenv
from backend.utils.observability import logger # Import logger
import litellm # Import litellm for embedding

load_dotenv()

class LLMService:
    def __init__(self):
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not self.gemini_api_key:
            logger.error("GEMINI_API_KEY not found in environment variables.")
            raise ValueError("GEMINI_API_KEY not found in environment variables.")

        self.agent = Agent(
            name="Gemini Assistant",
            model=LitellmModel(
                model="gemini/gemini-2.0-flash",  # Using a specific Gemini model
                api_key=self.gemini_api_key
            )
        )
        # Initialize litellm for embeddings
        litellm.api_key = self.gemini_api_key
        litellm.api_base = os.getenv("LITELLM_API_BASE", None) # Optional: if using a custom litellm proxy

    def get_agent(self):
        return self.agent

    async def get_embedding(self, text: str) -> list[float]:
        """
        Generates an embedding for the given text using LiteLLM.
        """
        try:
            # Using a common embedding model, e.g., "text-embedding-ada-002" or a Gemini embedding model
            # For Gemini, you might use "gemini-pro-vision" or a specific embedding model if available
            # For simplicity, let's assume a generic embedding model supported by litellm
            # You might need to adjust the model name based on actual LiteLLM/Gemini capabilities
            response = await litellm.aembedding(
                model="gemini/embedding-001", # Gemini embedding model
                input=[text],
                api_key=self.gemini_api_key
            )
            return response.data[0].embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {e}", exc_info=True)
            raise

    async def generate_response(self, prompt: str, context: str = None):
        full_prompt = f"Context: {context}\nPrompt: {prompt}" if context else prompt
        try:
            # In a real scenario, you would use self.agent.run(full_prompt)
            result = await Runner.run(self.agent, full_prompt)
            return result.final_output
        except Exception as e:
            logger.error(f"Error generating response from LLM: {e}", exc_info=True)
            return "I apologize, but I encountered an error while trying to generate a response."