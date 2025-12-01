import React, { useState } from 'react';
import { usePersonalizationStore } from '../stores/personalizationStore';
import { getTextSelection } from '../utils/textSelection';
import { saveHighlight, saveAnnotation } from '../services/personalizationService';

export default function PersonalizationDropdown() {
  const { isDropdownOpen } = usePersonalizationStore();
  const [error, setError] = useState<string | null>(null);
  const [annotationNote, setAnnotationNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleHighlight = async () => {
    setError(null);
    const selectedText = getTextSelection();
    if (selectedText) {
      try {
        setIsLoading(true);
        await saveHighlight(selectedText);
        setIsLoading(false);
        alert(`Highlighting text: ${selectedText} (saved successfully!)`)
      } catch (e: any) {
        setIsLoading(false);
        setError(e.message);
      }
    }
  };

  const handleAddAnnotation = async () => {
    setError(null);
    const selectedText = getTextSelection();
    if (selectedText && annotationNote) {
      try {
        setIsLoading(true);
        await saveAnnotation(selectedText, annotationNote);
        setIsLoading(false);
        alert(`Annotating text: ${selectedText} with note: ${annotationNote} (saved successfully!)`);
        setAnnotationNote('');
      } catch (e: any) {
        setIsLoading(false);
        setError(e.message);
      }
    }
  };

  return (
    <div>
      {error && (
        <div style={{ color: 'red' }}>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      {isDropdownOpen && (
        <ul>
          <li>Difficulty
            <select disabled={isLoading}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </li>
          <li>Topic
             <select disabled={isLoading}>
              <option>Functions</option>
              <option>Data Structures</option>
              <option>Algorithms</option>
            </select>
          </li>
          <li><button onClick={handleHighlight} disabled={isLoading}>{isLoading ? 'Saving...' : 'Highlight'}</button></li>
          <li>
            <textarea
              value={annotationNote}
              onChange={(e) => setAnnotationNote(e.target.value)}
              placeholder="Add a note..."
              disabled={isLoading}
            />
            <button onClick={handleAddAnnotation} disabled={isLoading}>{isLoading ? 'Saving...' : 'Add Annotation'}</button>
          </li>
        </ul>
      )}
    </div>
  );
}


