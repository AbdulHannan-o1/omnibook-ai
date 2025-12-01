    # Tasks for Content Personalization Feature

**Feature Branch**: `001-content-personalization`
**Date**: 2025-11-30

## Implementation Strategy

This feature will be implemented incrementally, starting with foundational components and then addressing each user story in priority order. The Minimum Viable Product (MVP) will focus on User Story 1 (Filter Exercises) as it addresses the core content personalization need.

## Phase 1: Setup

- [X] T001 Initialize database schema for UserPreferences in backend/db/schema.py
- [X] T002 Configure FastAPI to include personalization routes in backend/main.py

## Phase 2: Foundational - Personalization UI Infrastructure

- [X] T003 [US1] [US2] [US3] Add personalization button (magic wand icon) to Docusaurus chapter component in frontend/src/components/Chapter.tsx (or similar)
- [X] T004 [US1] [US2] [US3] Create dropdown menu component for personalization options in frontend/src/components/PersonalizationDropdown.tsx
- [X] T005 [US1] [US2] [US3] Implement state management for personalization UI (e.g., dropdown visibility) using Zustand in frontend/src/stores/personalizationStore.ts

## Phase 3: User Story 1 - Filter Exercises (P1)

**Story Goal**: Users can filter exercises in a chapter based on difficulty or topic.

**Independent Test**: Filter exercises by difficulty or topic; only matching exercises are displayed.

### Tasks

- [X] T006 [US1] Add filter options (difficulty, topic) to the personalization dropdown menu in frontend/src/components/PersonalizationDropdown.tsx
- [X] T007 [US1] Implement client-side logic to filter exercises based on selected criteria in frontend/src/hooks/useExerciseFilter.ts
- [X] T008 [P] [US1] Update Docusaurus chapter component to dynamically render exercises based on active filters in frontend/src/components/Chapter.tsx
- [X] T009 [US1] Add `difficulty` and `topic` metadata to example Docusaurus exercise markdown files in docs/exercises/example.md
- [X] T010 [US1] Create FastAPI endpoint `GET /api/v1/personalization/{userId}/{chapterId}` to retrieve user filter preferences in backend/main.py
- [X] T011 [US1] Create FastAPI endpoint `PUT /api/v1/personalization/{userId}/{chapterId}` to save user filter preferences in backend/main.py

## Phase 4: User Story 2 - Annotate and Highlight Content (P2)

**Story Goal**: Users can annotate and highlight specific sections of the chapter.

**Independent Test**: Highlight text and add annotations; these are persisted and visible across sessions.

### Tasks

- [X] T012 [US2] Integrate a client-side library for text selection, highlighting, and annotation in frontend/src/utils/textSelection.ts
- [X] T013 [US2] Add UI for creating annotations and highlights to the personalization dropdown or context menu in frontend/src/components/PersonalizationDropdown.tsx
- [X] T014 [US2] Implement frontend logic to capture text selections and associate with chapter content in frontend/src/hooks/useAnnotations.ts
- [X] T015 [P] [US2] Create FastAPI endpoint `POST /api/v1/personalization/{userId}/{chapterId}/highlights` to add highlights in backend/main.py
- [X] T016 [P] [US2] Create FastAPI endpoint `POST /api/v1/personalization/{userId}/{chapterId}/annotations` to add annotations in backend/main.py
- [X] T017 [US2] Modify `GET /api/v1/personalization/{userId}/{chapterId}` to return highlights and annotations in backend/main.py

## Phase 5: User Story 3 - Track Chapter Progress (P3)

**Story Goal**: Users can track their progress through a chapter, chapter-wise.

**Independent Test**: Complete a chapter section; it is marked as complete in the progress tracker and persists across sessions.

### Tasks

- [X] T018 [US3] Add UI element to display chapter progress and mark sections as complete in frontend/src/components/ChapterProgress.tsx
- [X] T019 [US3] Implement frontend logic to update chapter progress state based on user interaction in frontend/src/hooks/useChapterProgress.ts
- [X] T020 [US3] Create FastAPI endpoint `POST /api/v1/personalization/{userId}/{chapterId}/progress` to update chapter progress in backend/main.py
- [X] T021 [US3] Modify `GET /api/v1/personalization/{userId}/{chapterId}` to return completed sections in backend/main.py

## Final Phase: Polish & Cross-Cutting Concerns

- [X] T022 Implement comprehensive error handling for all frontend and backend personalization APIs.
- [X] T023 Add observability (logging, metrics) for personalization features in both frontend and backend.
- [X] T024 Write integration tests for all personalization API endpoints.
- [X] T025 Write unit tests for frontend components and hooks.

## Dependencies

- Phase 2 tasks are foundational for all subsequent user stories.
- User Story 1 (P1) is independent of P2 and P3.
- User Story 2 (P2) is independent of P1 and P3.
- User Story 3 (P3) is independent of P1 and P2.

## Parallel Execution Examples

**User Story 1 (P1) - Filter Exercises**:
- T006, T007, T008 (frontend) can be developed in parallel with T010, T011 (backend).

**User Story 2 (P2) - Annotate and Highlight Content**:
- T012, T013, T014 (frontend) can be developed in parallel with T015, T016, T017 (backend).

**User Story 3 (P3) - Track Chapter Progress**:
- T018, T019 (frontend) can be developed in parallel with T020, T021 (backend).
