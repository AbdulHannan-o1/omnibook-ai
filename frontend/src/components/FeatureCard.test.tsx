import React from 'react';
import { render, screen } from '@testing-library/react';
import FeatureCard from './FeatureCard';

describe('FeatureCard', () => {
  it('renders the title and description', () => {
    render(<FeatureCard title="Test Title" description="Test Description" icon="🤖" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
