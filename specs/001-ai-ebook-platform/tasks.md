# OmniBook-AI Platform - Development Tasks (Phase 1)

## Feature Name: OmniBook-AI Platform

## Phase 1: Setup - Project Structure

### Story Goal: Establish the foundational monorepo structure for the OmniBook-AI platform.

### Independent Test Criteria:
- The monorepo structure is created with `/book`, `/frontend`, and `/backend` directories.
- A root-level `package.json` exists (if applicable).
- A root-level `README.md` explaining the structure is created.

### Implementation Tasks:
- [ ] T001 Create root project directory structure: `/book`, `/frontend`, `/backend`
- [ ] T002 Create root-level `package.json` (optional, for shared commands)
- [ ] T003 Create root-level `README.md` explaining the monorepo structure

## Phase 2: Docusaurus (Book Engine)

### Story Goal: Initialize and configure Docusaurus to serve as the book engine for OmniBook-AI.

### Independent Test Criteria:
- Docusaurus project is initialized in `/book`.
- MDX support is configured.
- Essential theme components (toggles, sidebar, footer, navbar, layouts) are present.
- Initial chapter MDX files (`chapter-1-introduction.mdx`, `chapter-2-ai-agents.mdx`, `chapter-3-rag-systems.mdx`) are created as placeholders.
- "What’s on this page" component is implemented.
- Search (local or Algolia stub) is configured.
- Book title is set to "OmniBook-AI".

### Implementation Tasks:
- [ ] T004 [US-Docusaurus] Initialize Docusaurus project in `book/`
- [ ] T005 [US-Docusaurus] Configure MDX support in `book/docusaurus.config.js`
- [ ] T006 [US-Docusaurus] Add theme toggles, sidebar, footer, navbar, and layouts in `book/docusaurus.config.js` and theme files
- [ ] T007 [P] [US-Docusaurus] Create placeholder `chapter-1-introduction.mdx` in `book/docs/`
- [ ] T008 [P] [US-Docusaurus] Create placeholder `chapter-2-ai-agents.mdx` in `book/docs/`
- [ ] T009 [P] [US-Docusaurus] Create placeholder `chapter-3-rag-systems.mdx` in `book/docs/`
- [ ] T010 [US-Docusaurus] Add “What’s on this page” component using a custom MDX wrapper in `book/src/components/`
- [ ] T011 [US-Docusaurus] Configure search (local or algolia stub) in `book/docusaurus.config.js`
- [ ] T012 [US-Docusaurus] Set book title to **OmniBook-AI** in `book/docusaurus.config.js`

## Phase 3: React + Vite Frontend (TS)

### Story Goal: Set up the interactive frontend layer with Vite, React, and TypeScript.

### Independent Test Criteria:
- Vite + React + TypeScript project is initialized in `/frontend`.
- Main routes (`/`, `/book`, `/chat`) are defined.
- Reusable components (Header, Footer, Table of Content preview, Chapter cards) are integrated (as placeholders).
- API client to call FastAPI backend is implemented (as a stub).
- Simple chatbot UI (input box, messages) is built (as a stub).

### Implementation Tasks:
- [ ] T013 [US-Frontend] Initialize Vite + React + TypeScript project in `frontend/`
- [ ] T014 [US-Frontend] Build main routes (`/`, `/book`, `/chat`) in `frontend/src/App.tsx` and `frontend/src/router.tsx`
- [ ] T015 [P] [US-Frontend] Integrate Header / Footer components in `frontend/src/components/`
- [ ] T016 [P] [US-Frontend] Integrate Table of Content preview panel component in `frontend/src/components/`
- [ ] T017 [P] [US-Frontend] Integrate Chapter cards component in `frontend/src/components/`
- [ ] T018 [US-Frontend] Implement API client to call FastAPI backend (stub) in `frontend/src/services/api.ts`
- [ ] T019 [US-Frontend] Build simple chatbot UI (input box, messages, streaming optional) in `frontend/src/pages/Chat.tsx`

## Phase 4: FastAPI Backend

### Story Goal: Establish the FastAPI backend with essential API routes for RAG and chapter management.

### Independent Test Criteria:
- FastAPI project is initialized in `/backend`.
- Proper folder structure (`routers/`, `services/`, `schemas/`) is created.
- API routes (`POST /query`, `GET /chapters`, `GET /chapters/{id}`) are implemented (as stubs).
- CORS support for Vite + Docusaurus domains is added.

### Implementation Tasks:
- [ ] T020 [US-Backend] Initialize FastAPI project in `backend/`
- [ ] T021 [US-Backend] Create proper folder structure (`backend/routers/`, `backend/services/`, `backend/schemas/`)
- [ ] T022 [P] [US-Backend] Implement `POST /query` API route (stub) in `backend/routers/rag.py`
- [ ] T023 [P] [US-Backend] Implement `GET /chapters` API route (metadata list, stub) in `backend/routers/chapters.py`
- [ ] T024 [P] [US-Backend] Implement `GET /chapters/{id}` API route (return chapter content, stub) in `backend/routers/chapters.py`
- [ ] T025 [US-Backend] Add CORS support for Vite + Docusaurus domains in `backend/main.py`

## Phase 5: Include the First 3 Chapters

### Story Goal: Generate and integrate the initial book content into Docusaurus and prepare for RAG.

### Independent Test Criteria:
- First three full chapters are generated and placed as MDX files in `book/docs`.
- Chapters are added to `book/sidebars.json`.
- Chapters are indexed into a RAG storage (e.g., JSON, SQLite, ChromaDB).
- FastAPI `/chapters` and `/query` endpoints return expected data (mocked for now).

### Implementation Tasks:
- [ ] T026 [US-Chapters] Generate first 3 full chapters using agent pipeline
- [ ] T027 [US-Chapters] Convert generated chapters to MDX and place in `book/docs/`
- [ ] T028 [US-Chapters] Add chapters to `book/sidebars.json`
- [ ] T029 [US-Chapters] Index chapters into RAG storage (JSON, SQLite, ChromaDB, etc.)
- [ ] T030 [US-Chapters] Test FastAPI `/chapters` endpoint to return expected data
- [ ] T031 [US-Chapters] Test FastAPI `/query` endpoint to return expected data

## Phase 6: Integration Steps

### Story Goal: Connect the frontend, backend, and Docusaurus for a unified experience.

### Independent Test Criteria:
- Vite frontend `/chat` page successfully calls FastAPI `/query`.
- Docusaurus pages are linked within the Vite navigation menu.
- Unified branding and UI theme are applied across both systems.

### Implementation Tasks:
- [ ] T032 [US-Integration] Connect Vite frontend `/chat` page to FastAPI `/query`
- [ ] T033 [US-Integration] Link Docusaurus pages inside the Vite navigation menu
- [ ] T034 [US-Integration] Ensure unified branding and UI theme across both systems

## Phase 7: Quality & Deployment Prep

### Story Goal: Prepare the project for future quality assurance and deployment.

### Independent Test Criteria:
- `.env` templates are added for frontend and backend.
- Initial tests for FastAPI routes are present.
- GitHub repo actions placeholders are added (optional).
- Containerization instructions (Dockerfile stubs) are prepared.

### Implementation Tasks:
- [ ] T035 [P] [US-Quality] Add `.env` templates for frontend (`frontend/.env.example`) + backend (`backend/.env.example`)
- [ ] T036 [US-Quality] Add initial tests for FastAPI routes in `backend/tests/`
- [ ] T037 [US-Quality] Add GitHub repo actions placeholders (optional) in `.github/workflows/`
- [ ] T038 [US-Quality] Prepare containerization instructions (Dockerfile stubs only) in root and `/backend` and `/frontend`

---

## Dependencies
- Phase 1 must be completed before Phase 2, 3, 4.
- Phase 2, 3, 4 can be worked on in parallel once Phase 1 is complete.
- Phase 5 depends on Phase 2 and 4.
- Phase 6 depends on Phase 2, 3, 4, and 5.
- Phase 7 can be worked on in parallel with Phase 5 and 6, but ideally after core features are stable.

## Parallel Execution Examples
- **Phase 1:** Sequential (create directories, then package.json, then README).
- **After Phase 1:**
    - **Frontend Team:** T013, T014, T015, T016, T017, T018, T019 (Frontend tasks)
    - **Backend Team:** T020, T021, T022, T023, T024, T025 (Backend tasks)
    - **Docusaurus Team:** T004, T005, T006, T007, T008, T009, T010, T011, T012 (Docusaurus tasks)
- **After Docusaurus and Backend are ready:**
    - **Content Team:** T026, T027, T028, T029, T030, T031 (Chapter Integration)
- **Once all core components are ready:**
    - **Integration Team:** T032, T033, T034 (Final Integration)
- **Throughout Development:** T035, T036, T037, T038 (Quality & Deployment Prep)

## Implementation Strategy
We will follow an MVP-first, incremental delivery approach. Each user story phase aims to deliver a testable increment. Initial focus will be on getting the core Docusaurus, React, and FastAPI structures in place, then integrating the first set of chapters and basic RAG functionality.
