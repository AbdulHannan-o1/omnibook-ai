import React from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <h2 className={styles.title}>About the Book</h2>
      <p className={styles.description}>
        This book is an interactive guide to the fascinating world of Physical AI and Humanoid Robotics.
        Dive deep into the concepts, history, and future of embodied intelligence.
      </p>
      <ul className={styles.benefitsList}>
        <li>Explore cutting-edge research and real-world applications.</li>
        <li>Understand the ethical implications and societal impact.</li>
        <li>Discover the challenges and future directions of the field.</li>
      </ul>
    </section>
  );
};

export default AboutSection;
