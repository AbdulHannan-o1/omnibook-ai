import React, { useState } from 'react';
// import styles from './ChatbotPanel.module.css'; // Remove this import

interface ChatbotPanelProps {
  onClose: () => void; // Add onClose prop
}

const ChatbotPanel = ({ onClose }: ChatbotPanelProps) => { // Destructure onClose
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
        const response = await fetch('/api/v1/chatbot/chat', {
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
    <div className="chatbot-panel"> // Use global class
      <div className="chatbot-header"> // Use global class
        <h2>Chatbot</h2>
        <button className="close-button" onClick={onClose}>X</button> // Use global class and onClose
      </div>
      <div className="chatbot-messages"> // Use global class
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}> // Use global classes
            {msg.content}
          </div>
        ))}
        {isLoading && <div className="message bot-message">...</div>} // Use global classes
      </div>
      <div className="chatbot-input"> // Use global class
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="input-field" // Add global class for input
        />
        <button onClick={handleSendMessage} className="send-button">Send</button> // Add global class for send button
      </div>
    </div>
  );
};

export default ChatbotPanel;
