from qdrant_client import QdrantClient, models
import os
from dotenv import load_dotenv
from backend.utils.observability import logger

load_dotenv(dotenv_path='backend/.env')

class VectorStore:
    def __init__(self):
        self.qdrant_url = os.getenv("QDRANT_URL")
        self.qdrant_api_key = os.getenv("QDRANT_API_KEY")
        self.collection_name = os.getenv("QDRANT_COLLECTION_NAME", "omnibook_rag")

        if not self.qdrant_url or not self.qdrant_api_key:
            logger.error("QDRANT_URL or QDRANT_API_KEY not found in environment variables.")
            raise ValueError("QDRANT_URL or QDRANT_API_KEY not found in environment variables.")

        self.client = QdrantClient(
            url=self.qdrant_url,
            api_key=self.qdrant_api_key,
        )
        logger.info(f"Initialized Qdrant client for collection: {self.collection_name}")

        # Ensure collection exists
        self.client.recreate_collection(
            collection_name=self.collection_name,
            vectors_config=models.VectorParams(size=1024, distance=models.Distance.COSINE), # Updated for BGE-large-en-v1.5
        )
        logger.info(f"Ensured Qdrant collection '{self.collection_name}' exists.")

    async def search(self, query_embedding: list[float], limit: int = 3, with_payload: bool = False) -> list[str]:
        """
        Searches the Qdrant collection for relevant documents.
        If with_payload is True, returns a list of document payloads.
        """
        try:
            search_result = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_embedding,
                limit=limit,
                with_payload=True  # Always retrieve payload for reranking / metadata
            )
            if with_payload:
                documents = [hit.payload for hit in search_result if hit.payload]
            else:
                documents = [hit.payload["content"] for hit in search_result if hit.payload and "content" in hit.payload]
            logger.info(f"Found {len(documents)} documents from Qdrant search.")
            return documents
        except Exception as e:
            logger.error(f"Error searching Qdrant: {e}", exc_info=True)
            return []

    async def upsert_documents(self, documents: list[dict]):
        """
        Upserts documents into the Qdrant collection.
        Documents should be a list of dictionaries, each with 'id', 'vector', and 'payload' (containing 'content').
        """
        try:
            points = []
            for doc in documents:
                points.append(
                    models.PointStruct(
                        id=doc["id"],
                        vector=doc["vector"],
                        payload=doc["payload"]
                    )
                )
            self.client.upsert(
                collection_name=self.collection_name,
                points=points,
                wait=True
            )
            logger.info(f"Upserted {len(documents)} documents into Qdrant collection '{self.collection_name}'.")
        except Exception as e:
            logger.error(f"Error upserting documents to Qdrant: {e}", exc_info=True)
            raise

vector_store = VectorStore()
