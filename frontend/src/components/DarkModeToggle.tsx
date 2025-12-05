import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      className={styles.toggleButton}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '🌞' : '🌜'}
    </button>
  );
};

export default DarkModeToggle;
