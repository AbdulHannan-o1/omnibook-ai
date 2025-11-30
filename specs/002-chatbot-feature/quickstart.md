# Quickstart Guide: Chatbot Feature

This guide provides the necessary steps to set up and run the chatbot feature, which leverages the OpenAI Agent SDK with Google Gemini via LiteLLM.

## 1. Environment Setup

Ensure you have Python 3.11 (or newer) installed. It is recommended to use a virtual environment. Navigate to the `backend` directory.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

## 2. Install Dependencies

Install the OpenAI Agent SDK with the LiteLLM extension to enable Google Gemini model integration, along with FastAPI and Uvicorn.

```bash
pip install "openai-agents[litellm]" litellm fastapi uvicorn
```

## 3. Configure API Keys

Set your Google Gemini API key as an environment variable. Replace `YOUR_GEMINI_API_KEY` with your actual key. Create a `.env` file in the `backend` directory:

```
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

## 4. Run the Backend Server

Navigate to the `backend` directory and start the FastAPI server:

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

The chatbot API will be available at `http://localhost:8000/chatbot`.

## 5. Integrate with Frontend (Docusaurus)

To integrate the chatbot with the Docusaurus frontend:

1.  **Copy Chatbot UI Components**: Copy `ChatbotButton.tsx` and `ChatbotPanel.tsx` from `frontend/src/components` to `book/src/components`.
2.  **Copy Chatbot CSS**: Copy `App.css` from `frontend/src/App.css` to `book/src/css/custom.css`.
3.  **Create `Root.tsx`**: Create `book/src/theme/Root.tsx` with the following content:

    ```tsx
    import React, { useState, useEffect } from 'react';
    import ChatbotButton from '../components/ChatbotButton';
    import ChatbotPanel from '../components/ChatbotPanel';
    import { getSelectedText } from '../../frontend/src/utils/textSelection'; // Adjust path as needed
    import '@docusaurus/theme-classic/lib/theme/Root.css'; // Import the original Root.css if needed

    interface RootProps {
      children: React.ReactNode;
    }

    export default function Root({ children }: RootProps): JSX.Element {
      const [isPanelVisible, setIsPanelVisible] = useState(false);
      const [selectedText, setSelectedText] = useState<string | null>(null);

      const togglePanel = () => {
        setIsPanelVisible(!isPanelVisible);
        if (!isPanelVisible) {
          setSelectedText(getSelectedText());
        } else {
          setSelectedText(null);
        }
      };

      useEffect(() => {
        const handleMouseUp = () => {
          const text = getSelectedText();
          if (text && !isPanelVisible) {
            setSelectedText(text);
            setIsPanelVisible(true);
          }
        };

        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }, [isPanelVisible]);

      return (
        <React.Fragment>
          {children}
          <ChatbotButton onClick={togglePanel} />
          {isPanelVisible && <ChatbotPanel initialContext={selectedText} />}
        </React.Fragment>
      );
    }
    ```

4.  **Start Docusaurus**: Navigate to the `book` directory and start the Docusaurus development server:

    ```bash
    cd book
    npm start
    ```

    The chatbot will now be integrated into your Docusaurus application.
