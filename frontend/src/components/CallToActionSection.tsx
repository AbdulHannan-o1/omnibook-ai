import React from 'react';
import styles from './CallToActionSection.module.css';
import Link from '@docusaurus/Link';

const CallToActionSection = () => {
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.title}>Ready to explore the future?</h2>
      <Link
        className={styles.ctaButton}
        to="/docs/chapter-1-introduction-to-physical-ai-and-humanoid-robotics">
        Start Reading Now
      </Link>
    </section>
  );
};

export default CallToActionSection;
