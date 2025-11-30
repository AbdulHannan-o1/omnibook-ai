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