import React from 'react';
import PersonalizationDropdown from './PersonalizationDropdown';
import { usePersonalizationStore } from '../stores/personalizationStore';

interface ChapterCardProps {
  title: string;
  description: string;
}

export default function ChapterCard({ title, description }: ChapterCardProps) {
  const { toggleDropdown } = usePersonalizationStore();

  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={toggleDropdown}>Personalize</button>
      <PersonalizationDropdown />
      <p>{description}</p>
    </div>
  );
}
