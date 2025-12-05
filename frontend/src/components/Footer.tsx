import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© {currentYear} OmniBook AI. All rights reserved.</p>
      <div className={styles.socialLinks}>
        {/* Placeholder for social media icons */}
        <a href="#" className={styles.socialIcon}>X</a>
        <a href="#" className={styles.socialIcon}>In</a>
      </div>
    </footer>
  );
};

export default Footer;