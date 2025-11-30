from fastapi.testclient import TestClient
from backend.main import app
from unittest.mock import AsyncMock, patch

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}

@patch('backend.main.run_agent', new_callable=AsyncMock)

def test_chatbot_endpoint(mock_run_agent):

    mock_run_agent.return_value = "This is a test response."

    response = client.post("/chatbot", json={"message": "Hello"})

    assert response.status_code == 200

    assert response.json() == {"response": "This is a test response."}



@patch('backend.main.run_agent', new_callable=AsyncMock)

def test_chatbot_contextual_endpoint(mock_run_agent):

    mock_run_agent.return_value = "This is a contextual test response."

    response = client.post("/chatbot", json={"message": "Explain this", "context": "This is some selected text."})

    assert response.status_code == 200

    assert response.json() == {"response": "This is a contextual test response."}

    mock_run_agent.assert_called_once_with("Context: This is some selected text.\nExplain this")



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
