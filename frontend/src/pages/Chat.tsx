import React, { useState } from 'react';
import { query } from '../services/api';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInput('');
      const response = await query(input);
      const botMessage: Message = { text: response[0].text, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
