import os
import json
from fastapi import APIRouter, Body
from qdrant_client import QdrantClient, models
from dotenv import load_dotenv

router = APIRouter()

# Load environment variables
load_dotenv()

# Initialize Qdrant client
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")

qdrant_client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
)

COLLECTION_NAME = "omnibook_chapters"

# Define the path to the mock RAG storage (for initial data loading)
RAG_STORAGE_PATH = os.path.join(os.path.dirname(__file__), "..", "rag_storage.json")

def load_rag_data():
    try:
        with open(RAG_STORAGE_PATH, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: RAG storage file not found at {RAG_STORAGE_PATH}")
        return []

RAG_DATA = load_rag_data()

# Ensure Qdrant collection exists and data is uploaded
# In a real scenario, embeddings would be generated here
def initialize_qdrant_collection():
    try:
        qdrant_client.recreate_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(size=4, distance=models.Distance.COSINE),  # Mock size for now
        )
        points = []
        for i, chapter in enumerate(RAG_DATA):
            points.append(
                models.PointStruct(
                    id=i,
                    vector=[0.1, 0.2, 0.3, 0.4],  # Mock vector for now
                    payload=chapter,
                )
            )
        qdrant_client.upsert(collection_name=COLLECTION_NAME, points=points, wait=True)
        print(f"Qdrant collection '{COLLECTION_NAME}' initialized and data uploaded.")
    except Exception as e:
        print(f"Error initializing Qdrant collection: {e}")

# This would typically run on startup
initialize_qdrant_collection()

@router.post("/query")
async def query(query_text: str = Body(..., embed=True)):
    """
    Performs a RAG-like query against the Qdrant database.
    (Currently uses mock vectors and a placeholder search)
    """
    # In a real RAG system, query_text would be embedded and used for vector search.
    # For this stub, we'll do a simple keyword match against the local RAG_DATA.
    results = []
    for chapter in RAG_DATA:
        if query_text.lower() in chapter["content"].lower():
            results.append({"title": chapter["title"], "snippet": chapter["content"][:200] + "..."})

    if not results:
        return {"query": query_text, "response": "No relevant information found.", "sources": []}

    # Simulate Qdrant search for now
    search_result = qdrant_client.search(
        collection_name=COLLECTION_NAME,
        query_vector=[0.1, 0.2, 0.3, 0.4], # Mock query vector
        limit=3,
        query_filter=models.Filter(
            must=[
                models.FieldCondition(
                    key="content",
                    match=models.MatchText(text=query_text)
                )
            ]
        )
    )

    # Process search_result to extract relevant information and sources
    # For this mock, we'll use the keyword results and simulate source links
    sources = []
    for res in results:
        sources.append(res["title"])

    return {"query": query_text, "response": f"Here's some information related to '{query_text}': {results[0]['snippet']}", "sources": sources}

