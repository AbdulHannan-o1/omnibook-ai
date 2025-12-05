# Feature Specification: Chatbot Feature

**Feature Branch**: `002-chatbot-feature`
**Created**: 2025-11-29
**Status**: Draft
**Input**: User description: "create the chatbot feature, user should able access the chat boot with a click of a button on the right sight bottom on the app,
another part of the chatbot is if user select a portion of text from book it should trigger the chat bot with the context of the text user selected"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Access Chatbot (Priority: P1)

The user wants to open the chatbot by clicking a button located at the bottom right of the application interface. This allows for direct access to the chatbot for general queries or assistance.

**Why this priority**: Direct access to the chatbot is fundamental for its usability and primary interaction, making it a critical user flow.

**Independent Test**: Can be fully tested by verifying the button's presence and functionality, and delivers value by enabling users to interact with the chatbot at will.

**Acceptance Scenarios**:

1.  **Given** the user is on any page of the application, **When** they click the chatbot button, **Then** the chatbot interface appears.
2.  **Given** the chatbot interface is open, **When** the user closes it, **Then** the chatbot interface disappears, and the button remains visible.

---

### User Story 2 - Contextual Chatbot Trigger (Priority: P1)

The user wants to select a portion of text within a book and have the chatbot automatically open, with the selected text pre-loaded as context for the conversation. This enables context-aware assistance related to specific content.

**Why this priority**: This feature enhances the user experience significantly by providing immediate, relevant support based on their current reading, making it a core differentiator.

**Independent Test**: Can be fully tested by selecting text in a book, observing the chatbot launch with the correct context, and delivers value by offering intelligent, contextual assistance.

**Acceptance Scenarios**:

1.  **Given** the user is viewing a book and selects a portion of text, **When** the text selection is complete, **Then** the chatbot interface appears with the selected text pre-populated as its initial context.
2.  **Given** the chatbot is triggered contextually, **When** the user sends a message, **Then** the chatbot responds based on the provided text context.

---

### Edge Cases

-   What happens if the selected text is exceedingly long, potentially exceeding the chatbot's context window limit? The system should handle truncation or summarization if needed.
-   How does the system handle scenarios where the user attempts to trigger the contextual chatbot without any text selected (e.g., accidental click outside text)? It should gracefully open the chatbot without context or provide a "no text selected" message.
-   What happens if the backend chatbot service is temporarily unavailable or returns an error during either direct access or contextual triggering? The system should display a user-friendly error message.

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: System MUST display a floating button persistently on the bottom-right corner of the application UI for chatbot access.
-   **FR-002**: System MUST open a dedicated chatbot interface/panel when the chatbot access button is clicked.
-   **FR-003**: System MUST detect and capture user text selections within the book content area.
-   **FR-004**: System MUST automatically launch the chatbot interface and pre-fill its input with the selected text as context upon text selection.
-   **FR-005**: System MUST allow users to input text messages into the chatbot and display the chatbot's textual responses within the interface.
-   **FR-006**: System MUST ensure the chatbot UI adheres to enhanced accessibility standards, including comprehensive screen reader support and keyboard navigation.
-   **FR-007**: System MUST provide detailed logging, metrics (e.g., latency breakdowns, token usage), and distributed tracing for all chatbot operations to ensure comprehensive observability and performance monitoring.
-   **FR-008**: System MUST implement input and output guardrails to ensure chatbot responses remain strictly on-topic with book content and prevent off-topic inquiries.
-   **FR-009**: System MUST communicate between the client UI and the chatbot backend using HTTP/REST protocols, leveraging the existing FastAPI setup.

### Key Entities *(include if feature involves data)*

-   **Chatbot Session**: Represents an instance of interaction with the AI chatbot, including the history of messages exchanged and any context provided (e.g., selected text).
-   **Selected Text**: The specific portion of content highlighted by the user within a book, which serves as a contextual input for the chatbot.

## Clarifications

### Session 2025-11-29

- Q: Are there specific accessibility requirements (e.g., WCAG compliance, screen reader support) for the chatbot UI? → A: Enhanced Accessibility
- Q: What specific logging, metrics, or tracing signals are required for the chatbot's operation and performance monitoring? → A: Detailed Metrics & Tracing
- Q: What are the security and privacy considerations for handling user input and selected text, especially sensitive information? → A: Use input and output guardrails to prevent questions and answers other than book-related topics. Utilize platform default security.
- Q: What protocol should be used for communication between the client (UI) and the chatbot backend? → A: HTTP/REST (using existing FastAPI setup).

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: Users can successfully open the chatbot interface within 1 second of clicking the dedicated button, 95% of the time.
-   **SC-002**: The contextual chatbot is triggered and pre-populated with selected text within 2 seconds of a user completing a text selection, 90% of the time.
-   **SC-003**: 99% of user interactions with the chatbot, both direct and contextual, result in a valid response from the chatbot service.
-   **SC-004**: Users report a 15% increase in perceived productivity when using the contextual chatbot for understanding book content.

## RAG Chatbot Enhancements

This section outlines improvements to the RAG-based chatbot to enhance its accuracy, efficiency, and user experience.

### 1. Dedicated Embedding Model Optimized for Small Documents

**Current**: BAAI/bge-small-en-v1.5 (768-dim)
**Recommendation**: Upgrade to a higher-dimensional embedding model optimized for book-length content.
*   **bge-large-en-v1.5 (1024-dim)**: Expected to improve accuracy by 30-40%.
*   **text-embedding-3-large (OpenAI)**: Potential for even better performance if cloud integration is feasible.
*   **voyage-2 (Voyage AI)**: Best-in-class for book-length documents.

**Rationale**: Higher-dimensional embeddings offer better semantic matching for long content like book chapters, leading to improved retrieval accuracy.

### 2. Chunking Instead of Storing Whole Chapters

**Current**: Whole MDX chapter files are embedded.
**Recommendation**: Implement a chunking strategy for MDX content.
*   Chunk MDX into 500–1000 token blocks.
*   Overlap: 100–150 tokens.
*   Store each chunk separately in Qdrant.

**Rationale**: Chunking significantly improves RAG recall and reduces hallucinations by allowing more granular retrieval of relevant information.

### 3. Store Metadata in Qdrant for Better Context

**Recommendation**: Include comprehensive metadata for each chunk stored in Qdrant.
*   `chapter`: e.g., "Chapter 3 – What Are AI Agents?"
*   `section`: e.g., "3.1 Definition"
*   `source`: e.g., "book/docs/agents/definition.mdx"
*   `page`: e.g., 12

**Rationale**: Storing metadata enables the chatbot to return citations, support "where is this in the book?" queries, and improve overall routing and contextual understanding.

### 4. Use a Context Compressor Before Sending to LLM (Reranker)

**Current**: All retrieved chunks are sent directly to the LLM, leading to increased cost and potential noise.
**Recommendation**: Implement a context compression step (reranker) before sending chunks to the LLM.
*   Use a model like `bge-reranker-base` to filter down to the top 3–5 most relevant chunks from the initial retrieval.

**Rationale**: This reduces token usage, improves the signal-to-noise ratio for the LLM, and enhances the relevance of the final answer.

### 5. Add Query Rewriting / Query Expansion

**Recommendation**: Introduce an optional query rewriting/expansion step before the RAG search.
*   **Example**: User query "How do agents plan things?" could be rewritten to "In the context of the OmniBook-AI, explain how AI agents perform planning based on the chapter about agent architecture."

**Rationale**: Query rewriting can significantly improve search accuracy by making the user's intent more explicit and context-aware for the RAG system.

### 6. Add Guardrails to Ensure the Bot Stays Inside the Book

**Chatbot Mandate**:
*   Answer only from the provided book content.
*   Reject external topics.
*   Strictly use retrieved context.

**Guard Prompt**:
*   If the answer is not found inside the OmniBook-AI content, reply: "I'm sorry, this topic is outside the scope of this book."

**Rationale**: These guardrails ensure the chatbot remains aligned with its intended purpose, preventing hallucinations and out-of-scope responses, thus improving trustworthiness.

### 7. Preprocessing MDX Properly

**Recommendation**: Implement a robust preprocessing step for MDX content before embedding.
*   Remove JSX blocks.
*   Remove import/export statements.
*   Remove UI syntax.
*   Use a simple MDX → plain text converter.

**Rationale**: Removing extraneous syntax reduces noise in the embeddings, leading to more accurate semantic representations and improved retrieval.

### 8. Add "Structured Response Format"

**Recommendation**: Define a clean and consistent structured response format for the chatbot.

**Example Format**:
```
### Summary
<simple explanation>

### Key Points From the Book
- ...
- ...

### Exact Source
Chapter X → Section Y
```

**Rationale**: A structured response improves user experience, readability, and builds trust by clearly presenting information and its source.

### 9. Improve RAG Testing

**Recommendation**: Implement comprehensive unit tests for the RAG system.
*   **Retrieval tests**: Verify that relevant chunks are consistently retrieved.
*   **Relevance tests**: Evaluate the relevance of retrieved chunks to the query.
*   **Chunk recall tests**: Ensure the chunking strategy effectively retains information.
*   **Embedding quality tests**: Assess the quality and effectiveness of the generated embeddings.

**Rationale**: Robust testing ensures the RAG system's stability, accuracy, and prevents silent failures, leading to a more reliable chatbot.

### Ideal Architecture for Your Project

The refined RAG pipeline architecture should be as follows:

```
User Query
   ↓
Query Rewriter (optional)
   ↓
VectorStore (Qdrant) — retrieve top 10 chunks
   ↓
Reranker — filter down to top 3–5 most relevant
   ↓
LLM (Gemini, Claude, etc.)
   ↓
Chatbot answer with citations
```

**Rationale**: This best-practice RAG pipeline, informed by leading industry examples (OpenAI Cookbook, Anthropic Recipes, LangChain, LlamaIndex), provides optimal retrieval accuracy, context utilization, and response generation.
