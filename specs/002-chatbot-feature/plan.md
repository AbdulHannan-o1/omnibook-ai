# Implementation Plan: Chatbot Feature

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a chatbot feature that can be accessed via a persistent button in the UI or triggered contextually by selecting text within a book. The chatbot will be powered by the OpenAI Agent SDK using a Google Gemini model, developed in Python.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Python 3.11  
**Primary Dependencies**: `openai-agents[litellm]`, `litellm`, `qdrant-client`, `sentence-transformers`, `tiktoken`  
**Storage**: Qdrant for vector embeddings of chunked book content and associated metadata. Chatbot session data will be transient or managed by the SDK/model directly.  
**Testing**: Unit/integration tests using pytest for agent logic and interaction flows.  
**Target Platform**: Linux server, Web/Client application for UI integration
**Project Type**: Single (Python backend for chatbot logic), Web (for UI integration)  
**Performance Goals**: Chatbot response time under 2 seconds for 90% of requests (SC-002 from spec)  
**Constraints**: Ensure seamless contextual transfer of selected text to the chatbot. Scalability for 11-100 concurrent users.  
**Scale/Scope**: Initial release targets a single user for the book-reading application. Future scale to support 11-100 concurrent users.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

-   ✅ **I. Agent-First Architecture**: The chatbot is designed as an independent agent.
-   ✅ **II. RAG-Native Design**: RAG is integrated for contextual understanding using Qdrant.
-   ✅ **III. Test-First Development (NON-NEGOTIABLE)**: Pytest is planned; specific AI agent testing strategy requires research.
-   ⏳ **IV. Integration Testing for Knowledge Flows**: Will be critical for chatbot-book interaction; detailed strategy to be designed.
-   ✅ **V. Future-Proof Book Format Standards**: Not directly impacted, but contextual retrieval must respect book formats.
-   ⏳ **VI. Observability & Explainability**: Detailed logging and metrics for chatbot interactions and AI model responses will be a key design aspect.

**Architectural Constraints:**
-   ✅ **Support Claude Code, Spec Kit Plus, and CLI execution**: Chatbot integrates within the platform.
-   ⏳ **All modules must be importable as libraries**: Design consideration for Python backend.
-   ✅ **UI layers must only call CLI or HTTP wrappers—not internal logic**: Aligned with backend/UI separation.
-   ⏳ **Hot-swappable RAG backends**: Relevant if RAG is integrated; research needed.
-   ✅ **Agents must run locally unless cloud requirement explicitly approved**: Chatbot agent planned to run locally.
-   ✅ **All book content ingestion must be offline-friendly (no hidden APIs)**: Contextual text selection must respect this.

**Overall Status**: Initial alignment is good; areas marked ⏳ require further research and design to ensure full compliance. No immediate blockers.


## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
backend/
├── main.py              # Main FastAPI application entry point
├── agents/
│   └── chatbot_agent.py # Definition of the OpenAI agent
├── db/
│   ├── vector_store.py  # Qdrant client and vector store operations
│   └── schema.py        # Database schema (if any)
├── services/
│   └── llm_service.py   # LiteLLM integration for Google Gemini, embedding, and reranking
├── utils/
│   ├── mdx_utils.py     # Utilities for MDX processing
│   └── observability.py # Logging and observability utilities
└── tests/
    └── unit/
        └── test_chatbot_agent.py
```

**Structure Decision**: A single project structure is chosen, with a dedicated `chatbot/` directory for the Python backend agent, alongside existing `src/` and `tests/` directories.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
