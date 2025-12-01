
import React from 'react';

interface GlassmorphismCardProps {
  title: string;
  subtitle: string;
  buttons: string[];
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ title, subtitle, buttons }) => {
  return (
    <div
      data-testid="glassmorphism-card"
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div>
        {buttons.map((buttonText, index) => (
          <button key={index} style={{ margin: '5px' }}>
            {buttonText}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlassmorphismCard;
