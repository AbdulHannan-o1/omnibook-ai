import React from 'react';
import styles from './GlassmorphismCard.module.css';

interface GlassmorphismCardProps {
  children: React.ReactNode;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default GlassmorphismCard;
