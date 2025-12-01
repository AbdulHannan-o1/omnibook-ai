import React, { useState, useEffect } from 'react';
import DarkModeToggle from '@site-frontend/components/DarkModeToggle';
import useDarkMode from '@site-frontend/hooks/useDarkMode';
import ChatbotButton from '../components/ChatbotButton';
import ChatbotPanel from '../components/ChatbotPanel';
import { getSelectedText } from '@site-frontend/utils/textSelection';


interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
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
      <DarkModeToggle />
      <ChatbotButton onClick={togglePanel} />
      {isPanelVisible && <ChatbotPanel initialContext={selectedText} />}
    </React.Fragment>
  );
}