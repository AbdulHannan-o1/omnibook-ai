from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}

def test_rag_query():
    response = client.post("/rag/query", json={"query": "test query"})
    assert response.status_code == 200
    assert "response" in response.json()

def test_get_chapters():
    response = client.get("/chapters/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_chapter_by_id():
    # This test assumes a chapter with ID '1' exists
    response = client.get("/chapters/1")
    assert response.status_code == 200
    assert "id" in response.json()
    assert "title" in response.json()
    assert "content" in response.json()
