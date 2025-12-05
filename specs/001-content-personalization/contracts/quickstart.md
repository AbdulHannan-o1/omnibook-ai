# Quickstart: Content Personalization API

This document provides a quick guide to integrating with the Content Personalization API.

## Base URL

`/api/v1/personalization`

## Endpoints

### 1. Get User Preferences

- **Endpoint**: `GET /api/v1/personalization/{userId}/{chapterId}`
- **Description**: Retrieves the personalization preferences for a given user and chapter.
- **Response (200 OK)**:
    ```json
    {
        "userId": "string",
        "chapterId": "string",
        "filters": {},
        "highlights": [],
        "annotations": [],
        "completedSections": []
    }
    ```

### 2. Update User Preferences

- **Endpoint**: `PUT /api/v1/personalization/{userId}/{chapterId}`
- **Description**: Updates the personalization preferences for a given user and chapter.
- **Request Body (application/json)**:
    ```json
    {
        "filters": {},
        "highlights": [],
        "annotations": [],
        "completedSections": []
    }
    ```
- **Response (200 OK)**: Updated `UserPreferences` object.

### 3. Add Highlight

- **Endpoint**: `POST /api/v1/personalization/{userId}/{chapterId}/highlights`
- **Description**: Adds a new highlight to the user's preferences for a chapter.
- **Request Body (application/json)**:
    ```json
    {
        "start": 0,
        "end": 0,
        "text": "string",
        "color": "string"
    }
    ```
- **Response (200 OK)**: Updated `UserPreferences` object.

### 4. Add Annotation

- **Endpoint**: `POST /api/v1/personalization/{userId}/{chapterId}/annotations`
- **Description**: Adds a new annotation to the user's preferences for a chapter.
- **Request Body (application/json)**:
    ```json
    {
        "start": 0,
        "end": 0,
        "text": "string",
        "note": "string"
    }
    ```
- **Response (200 OK)**: Updated `UserPreferences` object.

### 5. Update Chapter Progress

- **Endpoint**: `POST /api/v1/personalization/{userId}/{chapterId}/progress`
- **Description**: Updates the completed sections for a user in a specific chapter.
- **Request Body (application/json)**:
    ```json
    {
        "sectionId": "string",
        "completed": true
    }
    ```
- **Response (200 OK)**: Updated `UserPreferences` object.
