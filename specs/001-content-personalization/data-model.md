# Data Model: Content Personalization Feature

## Entities

### UserPreferences
- Represents the personalization preferences of a user for a specific chapter.
- **Fields**:
    - `userId`: Unique identifier for the user (string).
    - `chapterId`: Unique identifier for the chapter (string).
    - `filters`: JSON object storing active content filters (e.g., `{'difficulty': 'Beginner', 'topic': 'Functions'}`).
    - `highlights`: Array of objects, each describing a highlight (e.g., `{'start': 10, 'end': 25, 'text': '...', 'color': '#FFFF00'}`).
    - `annotations`: Array of objects, each describing an annotation (e.g., `{'start': 30, 'end': 40, 'text': '...', 'note': 'User note here'}`).
    - `completedSections`: Array of strings, representing IDs or titles of completed sections within the chapter.

### Exercise (existing entity - additional attributes for filtering)
- Represents a practice problem within a chapter.
- **Additional Attributes** (to be added/ensured in Docusaurus frontmatter or metadata):
    - `difficulty`: String (e.g., 'Beginner', 'Intermediate', 'Advanced').
    - `topic`: String (e.g., 'Functions', 'Data Structures', 'Algorithms').

## Relationships

- `UserPreferences` has a one-to-one relationship with a `User` and a `Chapter`.
- `UserPreferences` contains arrays of `highlights` and `annotations` which are associated with specific `Chapter` content.
- `UserPreferences` also tracks `completedSections` within a `Chapter`.

## Validation Rules

- `userId` and `chapterId` are mandatory for `UserPreferences`.
- `start` and `end` fields for `highlights` and `annotations` must be valid offsets within the chapter content.
- `difficulty` and `topic` for `Exercise` should adhere to predefined categories.

## State Transitions (for Progress Tracking)

- A section in `completedSections` can be added when a user marks a section as complete.
- A section can be removed from `completedSections` if a user unmarks it (e.g., to re-do it).