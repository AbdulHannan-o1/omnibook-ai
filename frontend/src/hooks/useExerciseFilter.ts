import { useState, useEffect } from 'react';

interface Exercise {
  difficulty: string;
  topic: string;
}

interface UseExerciseFilterProps {
  exercises: Exercise[];
}

export const useExerciseFilter = ({ exercises }: UseExerciseFilterProps) => {
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>(exercises);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [topicFilter, setTopicFilter] = useState<string>('');

  useEffect(() => {
    let newFilteredExercises = exercises;

    if (difficultyFilter) {
      newFilteredExercises = newFilteredExercises.filter(
        (exercise) => exercise.difficulty === difficultyFilter
      );
    }

    if (topicFilter) {
      newFilteredExercises = newFilteredExercises.filter(
        (exercise) => exercise.topic === topicFilter
      );
    }

    setFilteredExercises(newFilteredExercises);
    console.log(`Filters applied: difficulty=${difficultyFilter}, topic=${topicFilter}. Resulting exercises: ${newFilteredExercises.length}`);
  }, [exercises, difficultyFilter, topicFilter]);

  return {
    filteredExercises,
    setDifficultyFilter,
    setTopicFilter,
  };
};
