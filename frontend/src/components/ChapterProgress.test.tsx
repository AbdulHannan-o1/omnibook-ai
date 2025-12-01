import { render, screen, fireEvent } from '@testing-library/react';
import ChapterProgress from './ChapterProgress';

describe('ChapterProgress', () => {
  const sections = [
    { id: '1', title: 'Introduction', completed: true },
    { id: '2', title: 'Main Content', completed: false },
    { id: '3', title: 'Conclusion', completed: false },
  ];

  it('renders the correct progress', () => {
    render(<ChapterProgress chapterId="chapter1" sections={sections} onToggleSectionCompletion={() => {}} />);
    expect(screen.getByText(/1 \/ 3 sections completed/)).toBeInTheDocument();
    expect(screen.getByText(/\(33%\)/)).toBeInTheDocument();
  });

  it('calls onToggleSectionCompletion when a checkbox is clicked', () => {
    const onToggleSectionCompletion = jest.fn();
    render(<ChapterProgress chapterId="chapter1" sections={sections} onToggleSectionCompletion={onToggleSectionCompletion} />);
    fireEvent.click(screen.getByLabelText('Main Content'));
    expect(onToggleSectionCompletion).toHaveBeenCalledWith('2');
  });
});
