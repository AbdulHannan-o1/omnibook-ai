# Data Model: Chatbot Feature

## Entities

### Chatbot Session
-   **Description**: Represents an ongoing conversation with the AI chatbot.
-   **Attributes**:
    -   `session_id`: Unique identifier for the chatbot session.
    -   `messages`: A chronological list of message objects, each containing `role` (user/agent) and `content`.
    -   `start_time`: Timestamp when the session began.
    -   `last_active_time`: Timestamp of the most recent message or interaction.
    -   `contextual_input`: Reference to the `Selected Text` (if any) that initiated or influenced the session.

### Selected Text
-   **Description**: A portion of text highlighted by the user within a book, used to provide context to the chatbot.
-   **Attributes**:
    -   `text_content`: The actual string of text selected by the user.
    -   `source_book_id`: Identifier for the book from which the text was selected.
    -   `page_number` (optional): The page number or range where the text was found.
    -   `start_offset`, `end_offset` (optional): Character offsets within the page/chapter for precise location.

## Relationships

-   A `Chatbot Session` can be initiated with or incorporate one `Selected Text` as its `contextual_input`.
-   `Selected Text` is derived from book content, which is an external entity to this feature's direct data model but provides essential context.

## Validation Rules (derived from Functional Requirements)

-   `Selected Text` `text_content` must not be empty if used to trigger contextual chatbot.
-   `session_id` must be unique for each `Chatbot Session`.
-   Message content within a `Chatbot Session` must not be empty.

## State Transitions (for Chatbot Session)

-   **Initiated**: When a new session begins (either via button click or contextual trigger).
-   **Active**: When messages are being exchanged.
-   **Inactive**: After a period of user inactivity (e.g., 5-10 minutes without interaction).
-   **Closed**: When the user explicitly closes the chatbot or the session is terminated.
