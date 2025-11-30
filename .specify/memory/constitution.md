<!--
Sync Impact Report:
Version change: 1.0.0 → 1.1.0
Modified principles:
  - Agent-First Architecture
  - RAG-Native Design
  - Test-First Development (NON-NEGOTIABLE)
  - Integration Testing for Knowledge Flows
  - Future-Proof Book Format Standards
  - Observability & Explainability
Added sections: Architectural Constraints, Development Workflow
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md: ✅ updated
  - .specify/templates/spec-template.md: ✅ updated
  - .specify/templates/tasks-template.md: ✅ updated
  - .specify/templates/commands/sp.constitution.md: ✅ updated
  - .specify/templates/commands/sp.plan.md: ✅ updated
  - .specify/templates/commands/sp.spec.md: ✅ updated
  - .specify/templates/commands/sp.tasks.md: ✅ updated
Follow-up TODOs: None
-->
# OmniBook-AI Platform Constitution

## Core Principles

### I. Agent-First Architecture
The system is designed around a `book-generation-agent` and will extend to other components (RAG, Chatbot) as independent agents with clear responsibilities and testability. This principle ensures modularity, clear separation of concerns, and ease of testing and maintenance.

### II. RAG-Native Design
RAG is a core principle, with explicit focus on treating documents as retrievable chunks, using embeddings, and ensuring explainable sources for generation. This guarantees that AI-generated content is grounded in verifiable facts and minimizes hallucinations.

### III. Test-First Development (NON-NEGOTIABLE)
TDD is mandatory: Tests are written, user approved, tests fail, then implementation occurs. The Red-Green-Refactor cycle is strictly enforced. This plan incorporates Jest/Vitest for unit/integration tests and Supertest for API contract tests, aligning with the mandate for pre-implementation testing. RAG retrieval and generation quality tests are also planned.

### IV. Integration Testing for Knowledge Flows
Integration tests are crucial for verifying the RAG pipeline, agent interactions, and new knowledge sources. Focus areas requiring integration tests include new library contract tests, contract changes, inter-service communication, and shared schemas.

### V. Future-Proof Book Format Standards
The use of Markdown/HTML for e-books and nested JSON for chapter hierarchy aligns with open formats. Metadata and content versioning will be explicitly addressed. This ensures longevity, interoperability, and easy adaptation to future changes.

### VI. Observability & Explainability
Comprehensive logging and metrics are mandated (NFR-OBS-001), directly supporting structured logging and explainability for agent and RAG actions. This ensures that the system's behavior can be monitored, debugged, and understood effectively.

## Architectural Constraints

- **Support Claude Code, Spec Kit Plus, and CLI execution**: The development environment and agent-centric design align with this.
- **All modules must be importable as libraries**: This will be a guiding principle during module design and implementation.
- **UI layers must only call CLI or HTTP wrappers—not internal logic**: The web application architecture with backend APIs ensures the frontend interacts via HTTP.
- **Hot-swappable RAG backends**: The design allows for flexibility in choosing and swapping vector database clients and embedding libraries.
- **Agents must run locally unless cloud requirement explicitly approved**: The `book-generation-agent` is internal and will run locally.
- **All book content ingestion must be offline-friendly (no hidden APIs)**: The plan emphasizes offline-friendly content ingestion.

## Development Workflow

- Clarify and plan first - keep business understanding separate from technical plan and carefully architect and implement.
- Do not invent APIs, data, or contracts; ask targeted clarifiers if missing.
- Never hardcode secrets or tokens; use `.env` and docs.
- Prefer the smallest viable diff; do not refactor unrelated code.
- Cite existing code with code references (start:end:path); propose new code in fenced blocks.
- Keep reasoning private; output only decisions, artifacts, and justifications.

## Governance

Constitution supersedes all other practices; Amendments require documentation, approval, and a migration plan. All PRs/reviews must verify compliance; Complexity must be justified; Use CLAUDE.md for runtime development guidance.

**Version**: 1.1.0 | **Ratified**: 2025-11-28 | **Last Amended**: 2025-11-28
