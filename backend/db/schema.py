from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class UserPreferences(BaseModel):
    user_id: Optional[str] = Field(None, description="Unique identifier for the user")
    chapter_id: Optional[str] = Field(None, description="Unique identifier for the chapter")
    filters: Dict[str, Any] = Field(default_factory=dict, description="Content filters")
    highlights: List[Dict[str, Any]] = Field(default_factory=list, description="User highlights")
    annotations: List[Dict[str, Any]] = Field(default_factory=list, description="User annotations")
    completed_sections: List[str] = Field(default_factory=list, description="Completed sections")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "user123",
                "chapter_id": "chapter-1",
                "filters": {"difficulty": "Beginner"},
                "highlights": [{"start": 10, "end": 25, "text": "example text"}],
                "annotations": [{"start": 30, "end": 40, "text": "another example", "note": "a note"}],
                "completed_sections": ["section-1", "section-2"]
            }
        }
