import React from 'react';
import { render, screen } from '@testing-library/react';
import CallToActionSection from './CallToActionSection';

describe('CallToActionSection', () => {
  it('renders the title and button', () => {
    render(<CallToActionSection />);
    expect(screen.getByText('Ready to explore the future?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start Reading Now' })).toBeInTheDocument();
  });
});
