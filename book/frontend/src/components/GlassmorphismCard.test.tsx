
import React from 'react';
import { render, screen } from '@testing-library/react';
import GlassmorphismCard from './GlassmorphismCard';

describe('GlassmorphismCard', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    buttons: ['Button 1', 'Button 2'],
  };

  it('renders without crashing', () => {
    render(<GlassmorphismCard {...defaultProps} />);
    expect(screen.getByTestId('glassmorphism-card')).toBeInTheDocument();
  });

  it('displays the correct title and subtitle', () => {
    render(<GlassmorphismCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.subtitle)).toBeInTheDocument();
  });

  it('renders all provided buttons', () => {
    render(<GlassmorphismCard {...defaultProps} />);
    defaultProps.buttons.forEach(buttonText => {
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
    });
  });

  it('applies glassmorphism styles', () => {
    render(<GlassmorphismCard {...defaultProps} />);
    const card = screen.getByTestId('glassmorphism-card');
    // This is a basic check. Real CSS style testing is more complex.
    expect(card).toHaveStyle('backdrop-filter: blur(10px)');
    expect(card).toHaveStyle('background-color: rgba(255, 255, 255, 0.1)');
  });
});
