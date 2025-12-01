import React from 'react';

const ChatbotButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="chatbot-button" onClick={onClick}> {/* Use global class name */}
      Chat
    </button>
  );
};

export default ChatbotButton;
