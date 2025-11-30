import React, { useState } from 'react';

const ChatbotPanel = () => {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { role: 'user', content: inputValue }];
      setMessages(newMessages);
      setInputValue('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputValue }),
        });
        const data = await response.json();
        setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chatbot-panel">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
        <button>Close</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="message assistant">...</div>}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotPanel;
