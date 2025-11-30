import { render, screen } from '@testing-library/react';
import ChatbotButton from './ChatbotButton';

test('renders chatbot button', () => {
  render(<ChatbotButton onClick={() => {}} />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('chatbot-button');
});
