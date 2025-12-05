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
            api_key=self.qdrant_api_key
        )
        logger.info(f"Initialized Qdrant client for collection: {self.collection_name}")

        self.embedding_dim = int(os.getenv("EMBEDDING_DIM", "384")) # Default to 384 if not set
        # Ensure collection exists
        try:
            self.client.get_collection(collection_name=self.collection_name)
            logger.info(f"Qdrant collection '{self.collection_name}' already exists.")
        except Exception:
            logger.info(f"Qdrant collection '{self.collection_name}' not found. Creating it now.")
            self.client.create_collection(
                collection_name=self.collection_name,
                vectors_config=models.VectorParams(size=self.embedding_dim, distance=models.Distance.COSINE),
            )
            logger.info(f"Ensured Qdrant collection '{self.collection_name}' exists.")

    async def search(self, query_embedding: list[float], query_text: str, limit: int = 3, with_payload: bool = False) -> list[dict]:
        """
        Searches the Qdrant collection for relevant documents.
        If with_payload is True, returns a list of document payloads.
        """
        try:
            search_result = self.client.query_points(
                collection_name=self.collection_name,
                query=query_embedding, # Changed from query_vector to query
                limit=limit,
                with_payload=True  # Always retrieve payload for reranking / metadata
            )
            if search_result.points: # Check if there are any points before accessing
                if with_payload:
                    documents = [hit.payload for hit in search_result.points if hit.payload]
                else:
                    documents = [hit.payload["content"] for hit in search_result.points if hit.payload and "content" in hit.payload]
            else:
                documents = []
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

    async def check_collection_status(self):
        """
        Checks and logs the status of the Qdrant collection.
        """
        try:
            # 1. All collections
            collections = self.client.get_collections().collections
            logger.info(f"Available Qdrant collections: {[c.name for c in collections]}")

            # 2. Get current collection info
            collection_info = self.client.get_collection(collection_name=self.collection_name)

            # 3. Vector size
            vector_size = collection_info.config.params.vectors.size
            logger.info(f"Collection '{self.collection_name}' vector size: {vector_size}")

            # 4. How many points are inserted
            points_count = collection_info.points_count
            logger.info(f"Collection '{self.collection_name}' points count: {points_count}")

            # 5. Indexing status (approximation via indexing threshold)
            # Qdrant doesn't expose a direct "indexing status" but rather configuration for it.
            # We can infer that if points are present, indexing is happening or done based on config.
            hnsw_config = collection_info.config.hnsw_config
            if hnsw_config:
                logger.info(f"Collection '{self.collection_name}' HNSW indexing enabled. M: {hnsw_config.m}, Ef construction: {hnsw_config.ef_construct}")
            else:
                logger.info(f"Collection '{self.collection_name}' HNSW indexing not configured.")

            # 6. Cluster health
            cluster_info = self.client.cluster_info()
            logger.info(f"Qdrant cluster status: {cluster_info.status.value}")
            if cluster_info.status.value == 'green':
                logger.info("Qdrant cluster is healthy.")
            else:
                logger.warning(f"Qdrant cluster is not healthy: {cluster_info.status.value}")

        except Exception as e:
            logger.error(f"Error checking Qdrant collection status: {e}", exc_info=True)

vector_store = VectorStore()
