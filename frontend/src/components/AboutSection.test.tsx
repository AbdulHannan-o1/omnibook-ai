import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutSection from './AboutSection';

describe('AboutSection', () => {
  it('renders the title and description', () => {
    render(<AboutSection />);
    expect(screen.getByText('About the Book')).toBeInTheDocument();
    expect(screen.getByText(/This book is an interactive guide/)).toBeInTheDocument();
  });
});
