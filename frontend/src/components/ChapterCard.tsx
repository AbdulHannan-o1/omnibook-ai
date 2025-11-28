import React from 'react';

interface ChapterCardProps {
  title: string;
  description: string;
}

export default function ChapterCard({ title, description }: ChapterCardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
