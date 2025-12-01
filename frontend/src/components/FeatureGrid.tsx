import React from 'react';
import FeatureCard from './FeatureCard';
import styles from './FeatureGrid.module.css';

const features = [
  {
    title: 'Embodied Cognition',
    description: 'Explore how physical interaction shapes intelligence.',
    icon: '🧠',
  },
  {
    title: 'Human-Robot Synergy',
    description: 'Understand the future of collaboration between humans and robots.',
    icon: '🤝',
  },
  {
    title: 'Mechanical Intelligence',
    description: 'Delve into the hardware and mechanics that bring robots to life.',
    icon: '⚙️',
  },
];

const FeatureGrid = () => {
  return (
    <div className={styles.featureGrid}>
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default FeatureGrid;
