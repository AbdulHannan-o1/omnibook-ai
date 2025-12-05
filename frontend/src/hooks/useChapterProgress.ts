import { useState, useEffect } from 'react';

interface ChapterProgressState {
  [chapterId: string]: string[]; // chapterId: [completedSectionIds]
}

export const useChapterProgress = () => {
  const [progress, setProgress] = useState<ChapterProgressState>({});

  const toggleSectionCompletion = (chapterId: string, sectionId: string) => {
    setProgress((prevProgress) => {
      const chapterSections = prevProgress[chapterId] || [];
      if (chapterSections.includes(sectionId)) {
        return {
          ...prevProgress,
          [chapterId]: chapterSections.filter((id) => id !== sectionId),
        };
      } else {
        return {
          ...prevProgress,
          [chapterId]: [...chapterSections, sectionId],
        };
      }
    });
    console.log(`Chapter ${chapterId} progress updated. Section ${sectionId} toggled.`);
  };

  return {
    progress,
    toggleSectionCompletion,
  };
};
