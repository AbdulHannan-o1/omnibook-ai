---
id: 0001
title: Update Project Constitution
stage: constitution
date: 2025-11-27
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: abdulhannan
command: /sp.constitution
labels: []
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

AI, Agents, RAGs & Future of the Book — Project Constitution
Core Principles
I. Agent-First Architecture

All features must be framed as independent, composable AI agents.
Agents must have:

A single clear responsibility

A text-I/O contract (stdin/stdout)

Deterministic fallbacks

No hidden state unless explicitly declared

Each agent must be usable outside the core system, and be testable in isolation.

II. RAG-Native Design

Retrieval-Augmented Generation (RAG) is a first-class principle.
All knowledge workflows must:

Treat documents (books, chapters, metadata) as retrievable chunks

Use embeddings + indexing libraries as standalone modules

Support both semantic and keyword retrieval

Ensure that generation is never done without an explainable source

RAG pipelines must remain replaceable and versioned independently.

III. Test-First Development (NON-NEGOTIABLE)

Before any implementation, the following must exist:

Unit tests for the agent

CLI contract tests

RAG retrieval tests

Generation quality tests (JSON + human-readable formats)

Only after tests fail → implementation is allowed.
Red-Green-Refactor is mandatory.

IV. Integration Testing for Knowledge Flows

Integration tests are required whenever:

Agent contracts change

Retrieval schema or chunking strategy changes

New knowledge sources (PDFs, EPUBs, URLs) are added

Multi-agent orchestration is introduced

End-to-end test: query → retrieve → generate → verify → output.

V. Future-Proof Book Format Standards

All knowledge inputs must follow these rules:

Books processed into open, transparent formats (Markdown, JSON, EPUB)

Chunking strategies documented per revision

Metadata required: author, semantic tags, chapter bounds, embedding version

Versioning: MAJOR.MINOR.BUILD for all book embeddings

Simplicity > Cleverness.
Strict “You Aren’t Gonna Need It” (YAGNI) enforcement.

VI. Observability & Explainability

Every agent and RAG action must generate structured logs:

What query was issued

What chunks were retrieved

Why the model produced its answer

Which agent handled which task

Explainability is a primary design constraint, not an afterthought.

Architecture Constraints

Must support Claude Code, Spec Kit Plus, and CLI execution

All modules must be importable as libraries

UI layers (if any) must only call CLI or HTTP wrappers—not internal logic

Hot-swappable RAG backends: local embeddings, cloud vectors, SQLite-based DBs

Agents must run locally unless a cloud requirement is explicitly approved

All book content ingestion must be offline-friendly (no hidden APIs)

Development Workflow

Define Agent Spec (YAML or SpecKit)

Define Tests First

Validate RAG Schema (chunk size, embeddings, vector store)

Implement Minimal Version

CLI Exposure

Review: Constitution Compliance Required

Merge Only When All Tests Pass

Version & Document Changes

Quality Gates:

100% tests passing

No untestable logic

No undeclared dependencies

Logging required for all retrieval and generation workflows

Governance

This constitution supersedes all development preferences

Amendments require:

Written proposal

Justification

Migration plan

Version bump

All PRs must be reviewed against this constitution

Complexity must always be justified

Use runtime-guidance.md for development-time rules

Version: 1.0.0
Ratified: 2025-11-26
Last Amended: 2025-11-26

## Response snapshot

The project constitution has been updated to version 1.0.0. No version bump was needed as this was the initial population of the template.
A follow-up TODO has been identified: TODO(runtime-guidance.md): Ensure runtime-guidance.md exists and contains relevant development-time rules as referenced in Governance.

## Outcome

- ✅ Impact: Constitution updated and aligned with user input.
- 🧪 Tests: No tests run.
- 📁 Files: .specify/memory/constitution.md updated.
- 🔁 Next prompts: None
- 🧠 Reflection: The constitution was successfully updated based on the user's provided content. The Sync Impact Report was generated and prepended to the file. A TODO for runtime-guidance.md was noted.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): None
- Prompt variant (if applicable): Initial population of constitution template
- Next experiment (smallest change to try): Ensure runtime-guidance.md exists and is properly referenced.

