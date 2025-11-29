import { useState } from 'react';
import './App.css';
import ChatbotButton from './components/ChatbotButton';
import ChatbotPanel from './components/ChatbotPanel';

function App() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome to OmniBook-AI!</p>
      <ChatbotButton onClick={togglePanel} />
      {isPanelVisible && <ChatbotPanel />}
    </>
  );
}

export default App;