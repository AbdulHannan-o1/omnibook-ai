import React from 'react';
import GlassmorphismCard from './GlassmorphismCard';
import styles from './HeroSection.module.css';
import Link from '@docusaurus/Link';

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.particles}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 20}s`,
          }} />
        ))}
      </div>
      <div className={styles.humanoidSilhouette}>
        {/* Placeholder for humanoid silhouette */}
      </div>
      <div className={styles.gradientBloom} />
      <GlassmorphismCard>
        <h1 className={styles.title}>Physical AI and Humanoid Robotics</h1>
        <p className={styles.subtitle}>
          An Interactive Guide to the Future of Embodied Intelligence
        </p>
        <div className={styles.buttonContainer}>
          <Link
            className={styles.ctaButton}
            to="/docs/chapter-1-introduction-to-physical-ai-and-humanoid-robotics">
            Start Reading
          </Link>
          <button className={styles.secondaryButton} onClick={() => console.log('Explore Features clicked')}>Explore Features</button>
        </div>
      </GlassmorphismCard>
    </div>
  );
};

export default HeroSection;