---
description: "Task list for Chatbot Feature implementation"
---

# Tasks: Chatbot Feature

**Input**: Design documents from `/specs/002-chatbot-feature/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The tasks include test tasks as part of the overall development process, aligning with a test-first approach where applicable.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project with `backend/` directory for backend Python logic and existing `src/` for UI.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the chatbot backend.

- [x] T001 Initialize Python virtual environment for the chatbot backend in `./backend/.venv`
- [x] T002 Install core dependencies `openai-agents[litellm]` and `litellm` in `./backend/.venv`
- [x] T003 Configure `GEMINI_API_KEY` environment variable in a `.env` file within `backend/`
- [x] T004 Create `backend/` directory and its subdirectories: `backend/agents`, `backend/services`, `backend/tests/unit`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core chatbot logic that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T005 Implement `llm_service.py` to encapsulate LiteLLM integration for Google Gemini models, including API key handling and model invocation in `backend/services/llm_service.py`
- [x] T006 Implement `chatbot_agent.py` defining the core OpenAI agent structure, instructions, and initial model in `backend/agents/chatbot_agent.py`
- [x] T007 Implement input and output guardrails within `backend/agents/chatbot_agent.py` to enforce on-topic book content conversations (FR-008)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Access Chatbot (Priority: P1) 🎯 MVP

**Goal**: Enable users to open the chatbot by clicking a floating button and interact with it.

**Independent Test**: Verify the floating button is present, clicks open/close the chatbot UI, and basic text interaction works.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Write unit tests for the chatbot UI component (e.g., `frontend/src/components/ChatbotButton.test.js`, `frontend/src/components/ChatbotPanel.test.js`)
- [x] T009 [P] [US1] Write integration tests for the chatbot UI opening/closing and basic communication with the backend (e.g., `tests/integration/test_chatbot_ui.py`)

### Implementation for User Story 1

- [x] T010 [P] [US1] Design and implement the floating chatbot button in the application's UI (FR-001) (e.g., `frontend/src/components/ChatbotButton.js`)
- [x] T011 [P] [US1] Develop the chatbot UI component/panel, ensuring enhanced accessibility (FR-002, FR-006) (e.g., `frontend/src/components/ChatbotPanel.js`)
- [x] T012 [US1] Create FastAPI endpoint for chatbot communication (HTTP/REST) in `backend/main.py` (FR-009)
- [x] T013 [US1] Integrate the chatbot UI components with the FastAPI backend endpoint.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Contextual Chatbot Trigger (Priority: P1)

**Goal**: Allow users to select text in a book to trigger the chatbot with the selected text as context.

**Independent Test**: Verify text selection within a book triggers the chatbot UI with the correct pre-populated context, and the chatbot responds based on it.

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T014 [P] [US2] Write unit tests for text selection and context passing logic (e.g., `frontend/src/utils/textSelection.test.js`)
- [x] T015 [P] [US2] Write integration tests for contextual chatbot triggering (e.g., `tests/integration/test_contextual_chatbot.py`)

### Implementation for User Story 2

- [x] T016 [US2] Implement functionality to detect and capture user text selections within book content (FR-003) (e.g., `frontend/src/utils/textSelection.js`)
- [x] T017 [US2] Develop the mechanism to automatically launch the chatbot interface with the selected text as initial context (FR-004) (e.g., `frontend/src/components/ChatbotPanel.js` modifications)
- [x] T018 [US2] Extend FastAPI endpoint in `backend/main.py` to receive and process contextual input.

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories.

- [x] T019 [P] Implement detailed logging, metrics, and distributed tracing for all chatbot operations (FR-007) in `backend/utils/observability.py` and `backend/main.py`
- [x] T020 Review and optimize performance of chatbot responses to meet SC-001 and SC-002 (e.g., profiling `backend/services/llm_service.py`)
- [x] T021 Address scalability considerations for 11-100 concurrent users (e.g., deployment strategy, resource allocation for `backend/` backend).
- [x] T022 Update `quickstart.md` with final instructions for deployment and operational details.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks currently have dependencies, but parallel opportunities exist within their sub-tasks.
- Once Foundational phase completes, both User Story 1 and User Story 2 can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Implementation tasks marked [P] within a story can run in parallel (if different files)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Write unit tests for the chatbot UI component (e.g., frontend/src/components/ChatbotButton.test.js, frontend/src/components/ChatbotPanel.test.js)"
Task: "Write integration tests for the chatbot UI opening/closing and basic communication with the backend (e.g., tests/integration/test_chatbot_ui.py)"

# Launch all parallel implementation tasks for User Story 1 (once tests are failing):
Task: "Design and implement the floating chatbot button in the application's UI (FR-001) (e.g., frontend/src/components/ChatbotButton.js)"
Task: "Develop the chatbot UI component/panel, ensuring enhanced accessibility (FR-002, FR-006) (e.g., frontend/src/components/ChatbotPanel.js)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
