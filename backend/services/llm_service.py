import os
from agents import Agent, Runner # Import Runner for agent execution
from agents.extensions.models.litellm_model import LitellmModel
from dotenv import load_dotenv
from backend.utils.observability import logger # Import logger
from backend.db.vector_store import vector_store
from sentence_transformers import SentenceTransformer, CrossEncoder # For BGE embedding and reranking

class LLMService:
    def __init__(self):
        load_dotenv() # Ensure .env is loaded when LLMService is instantiated
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not self.gemini_api_key:
            logger.error("GEMINI_API_KEY not found in environment variables.")
            raise ValueError("GEMINI_API_KEY not set")
        self.model = LitellmModel(
            model="gemini/gemini-2.0-flash",  # Using a specific Gemini model
            api_key=self.gemini_api_key
        )
        self.embedding_model = SentenceTransformer('BAAI/bge-large-en-v1.5') # Local BGE embedding model
        self.reranker = CrossEncoder('BAAI/bge-reranker-base') # Local BGE reranker model
        self.vector_store = vector_store

    def get_model(self):
        return self.model

    async def get_embedding(self, text: str) -> list[float]:
        """
        Generates an embedding for the given text using the local BGE model.
        """
        try:
            embeddings = self.embedding_model.encode([text], normalize_embeddings=True)
            return embeddings[0].tolist()
        except Exception as e:
            logger.error(f"Error generating embedding with BGE: {e}", exc_info=True)
            raise

    async def generate_response(self, prompt: str, context: str = None):
        full_prompt = f"Context: {context}\nPrompt: {prompt}" if context else prompt
        try:
            agent = Agent(
                name="Gemini Assistant",
                model=self.model,
                guardrails=None # Temporarily add to bypass error if Runner is passing it
            )
            result = await Runner.run(agent, full_prompt)
            return result.final_output
        except Exception as e:
            logger.error(f"Error generating response from LLM: {e}", exc_info=True)
            return "I apologize, but I encountered an error while trying to generate a response."

    async def _rewrite_query(self, query: str) -> str:
        """
        Rewrites the user query to improve RAG search accuracy.
        """
        rewrite_prompt = (
            f"You are a query rewriting assistant. Your goal is to rephrase the user's query "
            f"to make it more effective for retrieving relevant information from a book about Physical AI and Humanoid Robotics. "
            f"Expand on the query to include key terms and context relevant to the book content. "
            f"Only output the rewritten query, nothing else.\nOriginal Query: {query}\nRewritten Query:"
        )
        try:
            rewritten_query = await self.model.generate_text(rewrite_prompt, temperature=0.1, max_output_tokens=100)
            logger.info(f"Original Query: {query} -> Rewritten Query: {rewritten_query}")
            return rewritten_query.strip()
        except Exception as e:
            logger.error(f"Error rewriting query: {e}", exc_info=True)
            return query # Fallback to original query on error

    async def rag_search(self, query: str, initial_search_limit: int = 10, rerank_limit: int = 5, rewrite_query: bool = False) -> list[dict]:
        """
        Performs a RAG search to retrieve and rerank relevant documents based on the query.
        Optionally rewrites the query before search.
        """
        try:
            if rewrite_query:
                query = await self._rewrite_query(query)

            query_embedding = await self.get_embedding(query)
            if not query_embedding:
                return []

            # Step 1: Initial search to retrieve a larger set of documents
            documents_with_payload = await self.vector_store.search(query_embedding, query_text=query, limit=initial_search_limit, with_payload=True)

            if not documents_with_payload:
                return []

            # Prepare for reranking: pairs of (query, document_content)
            sentence_pairs = [[query, doc["content"]] for doc in documents_with_payload]

            # Step 2: Rerank the retrieved documents
            rerank_scores = self.reranker.predict(sentence_pairs)

            # Combine documents with their rerank scores and sort
            scored_documents = sorted(
                zip(documents_with_payload, rerank_scores),
                key=lambda x: x[1],
                reverse=True
            )

            # Step 3: Select the top N relevant documents (with their full payloads) after reranking
            top_documents_payloads = [doc[0] for doc in scored_documents[:rerank_limit]]

            return top_documents_payloads
        except Exception as e:
            logger.error(f"Error during RAG search: {e}", exc_info=True)
            return []
llm_service = LLMService()

def get_gemini_model():
    return llm_service.get_model()