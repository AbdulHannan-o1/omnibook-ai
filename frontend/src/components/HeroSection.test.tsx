import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renders the main title', () => {
    render(<HeroSection />);
    expect(screen.getByText('Physical AI and Humanoid Robotics')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<HeroSection />);
    expect(screen.getByText('An Interactive Guide to the Future of Embodied Intelligence')).toBeInTheDocument();
  });

  it('renders the "Start Reading" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: 'Start Reading' })).toBeInTheDocument();
  });

  it('renders the "Explore Features" button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: 'Explore Features' })).toBeInTheDocument();
  });
});
