import React from 'react';

const ChatbotButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="chatbot-button" onClick={onClick}>
      Chat
    </button>
  );
};

export default ChatbotButton;
