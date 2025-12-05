import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© \d{4} OmniBook AI. All rights reserved./)).toBeInTheDocument();
  });
});
