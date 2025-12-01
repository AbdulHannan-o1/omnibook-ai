import React from 'react';
import { render, screen } from '@testing-library/react';
import FeatureGrid from './FeatureGrid';

describe('FeatureGrid', () => {
  it('renders the feature grid with three features', () => {
    render(<FeatureGrid />);
    expect(screen.getByText('Embodied Cognition')).toBeInTheDocument();
    expect(screen.getByText('Human-Robot Synergy')).toBeInTheDocument();
    expect(screen.getByText('Mechanical Intelligence')).toBeInTheDocument();
  });
});
