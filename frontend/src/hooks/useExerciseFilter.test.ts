import { renderHook, act } from '@testing-library/react-hooks';
import { useExerciseFilter } from './useExerciseFilter';

describe('useExerciseFilter', () => {
  const initialExercises = [
    { difficulty: 'Beginner', topic: 'Functions' },
    { difficulty: 'Intermediate', topic: 'Data Structures' },
    { difficulty: 'Beginner', topic: 'Algorithms' },
  ];

  it('should return all exercises initially', () => {
    const { result } = renderHook(() => useExerciseFilter({ exercises: initialExercises }));
    expect(result.current.filteredExercises).toEqual(initialExercises);
  });

  it('should filter by difficulty', () => {
    const { result } = renderHook(() => useExerciseFilter({ exercises: initialExercises }));
    act(() => {
      result.current.setDifficultyFilter('Beginner');
    });
    expect(result.current.filteredExercises).toEqual([
      { difficulty: 'Beginner', topic: 'Functions' },
      { difficulty: 'Beginner', topic: 'Algorithms' },
    ]);
  });

  it('should filter by topic', () => {
    const { result } = renderHook(() => useExerciseFilter({ exercises: initialExercises }));
    act(() => {
      result.current.setTopicFilter('Data Structures');
    });
    expect(result.current.filteredExercises).toEqual([
      { difficulty: 'Intermediate', topic: 'Data Structures' },
    ]);
  });

  it('should filter by both difficulty and topic', () => {
    const { result } = renderHook(() => useExerciseFilter({ exercises: initialExercises }));
    act(() => {
      result.current.setDifficultyFilter('Beginner');
      result.current.setTopicFilter('Functions');
    });
    expect(result.current.filteredExercises).toEqual([
      { difficulty: 'Beginner', topic: 'Functions' },
    ]);
  });

  it('should return no exercises if filters do not match any', () => {
    const { result } = renderHook(() => useExerciseFilter({ exercises: initialExercises }));
    act(() => {
      result.current.setDifficultyFilter('Advanced');
    });
    expect(result.current.filteredExercises).toEqual([]);
  });
});