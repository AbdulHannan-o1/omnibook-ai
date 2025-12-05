import { renderHook, act } from '@testing-library/react-hooks';
import { useAnnotations } from './useAnnotations';

describe('useAnnotations', () => {
  it('should add an annotation', () => {
    const { result } = renderHook(() => useAnnotations());
    const annotation = { start: 0, end: 5, text: 'hello', note: 'greeting' };

    act(() => {
      result.current.addAnnotation(annotation);
    });

    expect(result.current.annotations).toEqual([annotation]);
  });

  it('should add a highlight', () => {
    const { result } = renderHook(() => useAnnotations());
    const highlight = { start: 0, end: 5, text: 'world', color: 'yellow' };

    act(() => {
      result.current.addHighlight(highlight);
    });

    expect(result.current.highlights).toEqual([highlight]);
  });

  it('should add multiple annotations and highlights', () => {
    const { result } = renderHook(() => useAnnotations());
    const annotation1 = { start: 0, end: 5, text: 'first', note: '1' };
    const highlight1 = { start: 6, end: 10, text: 'second', color: 'blue' };
    const annotation2 = { start: 11, end: 15, text: 'third', note: '3' };

    act(() => {
      result.current.addAnnotation(annotation1);
      result.current.addHighlight(highlight1);
      result.current.addAnnotation(annotation2);
    });

    expect(result.current.annotations).toEqual([annotation1, annotation2]);
    expect(result.current.highlights).toEqual([highlight1]);
  });
});