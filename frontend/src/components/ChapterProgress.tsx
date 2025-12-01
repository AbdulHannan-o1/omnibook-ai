import React from 'react';

interface ChapterProgressProps {
  chapterId: string;
  sections: { id: string; title: string; completed: boolean }[];
  onToggleSectionCompletion: (sectionId: string) => void;
}

export default function ChapterProgress({
  chapterId,
  sections,
  onToggleSectionCompletion,
}: ChapterProgressProps) {
  const completedCount = sections.filter((section) => section.completed).length;
  const totalCount = sections.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div>
      <h3>Chapter Progress ({chapterId})</h3>
      <p>{completedCount} / {totalCount} sections completed ({progress.toFixed(0)}%)</p>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <input
              type="checkbox"
              checked={section.completed}
              onChange={() => onToggleSectionCompletion(section.id)}
            />
            {section.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
