import { render, screen, fireEvent } from '@testing-library/react';
import ChapterCard from './ChapterCard';
import { usePersonalizationStore } from '../stores/personalizationStore';

jest.mock('../stores/personalizationStore');

describe('ChapterCard', () => {
  it('calls toggleDropdown when the personalize button is clicked', () => {
    const toggleDropdown = jest.fn();
    (usePersonalizationStore as jest.Mock).mockReturnValue({
      toggleDropdown,
    });
    render(<ChapterCard title="Test Title" description="Test Description" />);
    fireEvent.click(screen.getByText('Personalize'));
    expect(toggleDropdown).toHaveBeenCalled();
  });
});
