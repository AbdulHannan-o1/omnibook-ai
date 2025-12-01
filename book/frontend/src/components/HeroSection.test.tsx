
import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<HeroSection />);
    expect(screen.getByText('PHYSICAL AI & HUMANOID ROBOTICS')).toBeInTheDocument();
  });

  it('displays the correct subtitle', () => {
    render(<HeroSection />);
    expect(screen.getByText('Explore the frontier of embodied intelligence')).toBeInTheDocument();
  });

  it('renders the GlassmorphismCard component', () => {
    render(<HeroSection />);
    expect(screen.getByTestId('glassmorphism-card')).toBeInTheDocument();
  });

  it('contains a "Start Reading Now" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /start reading now/i })).toBeInTheDocument();
  });
});
