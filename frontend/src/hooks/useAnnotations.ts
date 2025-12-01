import { useState, useEffect } from 'react';

interface Annotation {
  start: number;
  end: number;
  text: string;
  note?: string;
}

interface Highlight extends Annotation {
  color: string;
}

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);

  const addAnnotation = (annotation: Annotation) => {
    setAnnotations((prev) => [...prev, annotation]);
    console.log('Annotation added:', annotation);
  };

  const addHighlight = (highlight: Highlight) => {
    setHighlights((prev) => [...prev, highlight]);
    console.log('Highlight added:', highlight);
  };

  return {
    annotations,
    highlights,
    addAnnotation,
    addHighlight,
  };
};
