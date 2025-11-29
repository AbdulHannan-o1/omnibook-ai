from agents import Agent, Runner
from backend.services.llm_service import get_gemini_model
from backend.utils.observability import logger

def book_guardrail(input_data):
    """
    A simple guardrail to check if the input is related to books.
    """
    book_keywords = ["book", "author", "chapter", "page", "read", "story", "novel"]
    if not any(keyword in input_data.lower() for keyword in book_keywords):
        logger.warning(f"Guardrail triggered: Off-topic input received: '{input_data}'")
        return "I can only answer questions about books. Please ask me something about a book."
    return None

def get_chatbot_agent():
    """
    Initializes and returns the chatbot agent.
    """
    logger.info("Initializing chatbot agent.")
    return Agent(
        name="Gemini Chatbot",
        instructions="You are a helpful assistant that can answer questions about books.",
        model=get_gemini_model(),
        guardrails=[book_guardrail]
    )

async def run_agent(user_input):
    """
    Runs the chatbot agent with the given user input.
    """
    logger.info(f"Running chatbot agent with input: '{user_input}'")
    agent = get_chatbot_agent()
    result = await Runner.run(agent, user_input)
    logger.info(f"Chatbot agent finished. Output: '{result.final_output}'")
    return result.final_output
