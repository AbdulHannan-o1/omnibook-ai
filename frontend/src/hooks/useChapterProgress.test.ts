import { renderHook, act } from '@testing-library/react-hooks';
import { useChapterProgress } from './useChapterProgress';

describe('useChapterProgress', () => {
  it('should initialize with empty progress', () => {
    const { result } = renderHook(() => useChapterProgress());
    expect(result.current.progress).toEqual({});
  });

  it('should toggle section completion', () => {
    const { result } = renderHook(() => useChapterProgress());
    const chapterId = 'chapter1';
    const sectionId = 'intro';

    act(() => {
      result.current.toggleSectionCompletion(chapterId, sectionId);
    });

    expect(result.current.progress).toEqual({ chapter1: ['intro'] });

    act(() => {
      result.current.toggleSectionCompletion(chapterId, 'section1');
    });

    expect(result.current.progress).toEqual({ chapter1: ['intro', 'section1'] });

    act(() => {
      result.current.toggleSectionCompletion(chapterId, sectionId);
    });

    expect(result.current.progress).toEqual({ chapter1: ['section1'] });
  });

  it('should handle multiple chapters', () => {
    const { result } = renderHook(() => useChapterProgress());

    act(() => {
      result.current.toggleSectionCompletion('chapterA', 'secA1');
      result.current.toggleSectionCompletion('chapterB', 'secB1');
    });

    expect(result.current.progress).toEqual({ chapterA: ['secA1'], chapterB: ['secB1'] });
  });
});