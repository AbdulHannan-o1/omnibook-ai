import React from 'react';
import { render, screen } from '@testing-library/react';
import GlassmorphismCard from './GlassmorphismCard';

describe('GlassmorphismCard', () => {
  it('renders its children', () => {
    render(
      <GlassmorphismCard>
        <div>Test Child</div>
      </GlassmorphismCard>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
