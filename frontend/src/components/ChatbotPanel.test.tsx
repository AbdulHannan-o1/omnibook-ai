import { render, screen } from '@testing-library/react';
import ChatbotPanel from './ChatbotPanel';

test('renders chatbot panel with header, messages, and input', () => {
  render(<ChatbotPanel />);
  
  // Check for header
  const headerElement = screen.getByText(/Chatbot/i);
  expect(headerElement).toBeInTheDocument();

  // Check for close button
  const closeButton = screen.getByRole('button', { name: /Close/i });
  expect(closeButton).toBeInTheDocument();

  // Check for message list
  const messageListElement = document.querySelector('.chatbot-messages');
  expect(messageListElement).toBeInTheDocument();

  // Check for input form
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();

  // Check for send button
  const sendButton = screen.getByRole('button', { name: /Send/i });
  expect(sendButton).toBeInTheDocument();
});
