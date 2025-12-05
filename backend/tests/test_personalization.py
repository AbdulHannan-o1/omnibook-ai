from fastapi.testclient import TestClient
from backend.main import app
from backend.db.schema import UserPreferences

client = TestClient(app)

def test_get_initial_user_preferences():
    user_id = "testuser1"
    chapter_id = "chapter1"
    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    assert response.json() == UserPreferences(user_id=user_id, chapter_id=chapter_id).model_dump()

def test_update_user_preferences():
    user_id = "testuser2"
    chapter_id = "chapter2"
    new_prefs = {
        "filters": {"difficulty": "Beginner"},
        "highlights": [{"start": 0, "end": 5, "text": "hello", "color": "yellow"}],
        "annotations": [{"start": 10, "end": 15, "text": "world", "note": "a note"}],
        "completed_sections": ["intro"]
    }
    response = client.put(f"/api/v1/personalization/{user_id}/{chapter_id}", json=new_prefs)
    assert response.status_code == 200
    assert response.json() == {"message": "Preferences updated"}

    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    retrieved_prefs = response.json()
    assert retrieved_prefs["filters"] == new_prefs["filters"]
    assert retrieved_prefs["highlights"] == new_prefs["highlights"]
    assert retrieved_prefs["annotations"] == new_prefs["annotations"]
    assert retrieved_prefs["completed_sections"] == new_prefs["completed_sections"]

def test_update_partial_user_preferences():
    user_id = "testuser3"
    chapter_id = "chapter3"
    initial_prefs = {"filters": {"difficulty": "Intermediate"}}
    response = client.put(f"/api/v1/personalization/{user_id}/{chapter_id}", json=initial_prefs)
    assert response.status_code == 200


    partial_update = {"completed_sections": ["section1", "section2"]}
    response = client.put(f"/api/v1/personalization/{user_id}/{chapter_id}", json=partial_update)
    assert response.status_code == 200

    retrieved_prefs = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}").json()
    assert retrieved_prefs["completed_sections"] == partial_update["completed_sections"]
    assert retrieved_prefs["filters"] == {} # The old filters should be gone

def test_get_user_preferences_non_existent_user():
    user_id = "nonexistent"
    chapter_id = "chapterX"
    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    assert response.json() == UserPreferences(user_id=user_id, chapter_id=chapter_id).model_dump()

def test_add_highlight():
    user_id = "testuser4"
    chapter_id = "chapter4"
    highlight = {"start": 0, "end": 5, "text": "hello", "color": "yellow"}
    response = client.post(f"/api/v1/personalization/{user_id}/{chapter_id}/highlights", json=highlight)
    assert response.status_code == 200
    assert response.json() == {"message": "Highlight added"}

    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    retrieved_prefs = response.json()
    assert highlight in retrieved_prefs["highlights"]

def test_add_annotation():
    user_id = "testuser5"
    chapter_id = "chapter5"
    annotation = {"start": 10, "end": 15, "text": "world", "note": "a note"}
    response = client.post(f"/api/v1/personalization/{user_id}/{chapter_id}/annotations", json=annotation)
    assert response.status_code == 200
    assert response.json() == {"message": "Annotation added"}

    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    retrieved_prefs = response.json()
    assert annotation in retrieved_prefs["annotations"]

def test_update_chapter_progress():
    user_id = "testuser6"
    chapter_id = "chapter6"
    progress = {"sectionId": "section1", "completed": True}
    response = client.post(f"/api/v1/personalization/{user_id}/{chapter_id}/progress", json=progress)
    assert response.status_code == 200
    assert response.json() == {"message": "Progress updated"}

    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    retrieved_prefs = response.json()
    assert "section1" in retrieved_prefs["completed_sections"]

    progress = {"sectionId": "section1", "completed": False}
    response = client.post(f"/api/v1/personalization/{user_id}/{chapter_id}/progress", json=progress)
    assert response.status_code == 200
    assert response.json() == {"message": "Progress updated"}

    response = client.get(f"/api/v1/personalization/{user_id}/{chapter_id}")
    assert response.status_code == 200
    retrieved_prefs = response.json()
    assert "section1" not in retrieved_prefs["completed_sections"]


