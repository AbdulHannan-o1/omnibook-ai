from agents import Agent, Runner
from backend.services.llm_service import get_gemini_model, llm_service
from backend.utils.observability import logger


async def run_agent(user_input):
    """
    Runs the chatbot agent with the given user input, incorporating RAG.
    """
    logger.info(f"Running chatbot agent with input: '{user_input}'")

    # Perform RAG search to get relevant context and metadata
    retrieved_documents_payloads = await llm_service.rag_search(user_input)

    context_contents = [doc["content"] for doc in retrieved_documents_payloads if "content" in doc]
    context = "\n".join(context_contents) if context_contents else "No specific context found."

    # Prepare source information for structured response
    source_info = []
    for doc in retrieved_documents_payloads:
        chapter = doc.get("chapter", "N/A")
        section = doc.get("section", "N/A")
        source = doc.get("source", "N/A")
        page = doc.get("page", "N/A")
        source_info.append(f"- {chapter} → {section} (Source: {source}, Page: {page})")

    sources_text = "\n".join(source_info) if source_info else "No specific sources found."

    # Update agent instructions with retrieved context and structured response format
    agent_instructions = (
        "You are a helpful assistant that can answer questions about books. "
        "Use the following context to answer the user's question. "
        "If the answer is not found inside the OmniBook-AI content, reply: 'I'm sorry, this topic is outside the scope of this book.'\n\n"
        f"Context: {context}\n\n"
        "Please provide your answer in the following structured format:\n\n"
        "### Summary\n"
        "<simple explanation>\n\n"
        "### Key Points From the Book\n"
        "- ...\n"
        "- ...\n\n"
        "### Exact Source\n"
        f"{sources_text}"
    )

    agent = Agent(
        name="Gemini Chatbot",
        instructions=agent_instructions,
        model=get_gemini_model()
    )
    result = await Runner.run(agent, user_input)
    logger.info(f"Chatbot agent finished. Output: '{result.final_output}'")
    return result.final_output
