
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CenterButtonProps } from './types';

const CenterButton: React.FC<CenterButtonProps> = ({ 
  text, 
  size, 
  path, 
  isHighlighted,
  id 
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Base glow effect that's consistent before and after highlighting
  const baseGlow = '0 0 20px rgba(16, 249, 241, 0.7), 0 0 40px rgba(16, 249, 241, 0.4)';
  
  // Enhanced glow for highlighted state (system highlighting)
  const highlightedGlow = '0 0 30px rgba(16, 249, 241, 0.9), 0 0 50px rgba(16, 249, 241, 0.7), 0 0 70px rgba(16, 249, 241, 0.5)';
  
  // Even more enhanced glow for hover state
  const hoverGlow = '0 0 40px rgba(16, 249, 241, 1), 0 0 60px rgba(16, 249, 241, 0.8), 0 0 80px rgba(16, 249, 241, 0.6)';

  // Choose the appropriate glow based on state
  // If hovered, always use the hover glow regardless of highlight state
  const glowIntensity = isHovered ? hoverGlow : (isHighlighted ? highlightedGlow : baseGlow);

  // Set scale to exactly 2 when hovered, otherwise 1
  const scale = isHovered ? 2 : 1;

  return (
    <button 
      id={id}
      onClick={() => navigate(path)} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`tron-button animate-none z-10 rounded-full ${
        isHovered ? 'hover-highlighted' : (isHighlighted ? 'highlighted-button text-brightness-transition' : 'glow-text')
      }`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        boxShadow: glowIntensity,
        transform: `scale(${scale})`,
        transition: 'box-shadow 0.3s ease-in-out, transform 0.5s ease-in-out',
        zIndex: isHovered ? 100 : 10,
        color: isHovered 
          ? 'rgba(16, 249, 241, 1)' /* Bright cyan when hovered */
          : (isHighlighted ? '' : 'rgba(16, 249, 241, 0.7)'), /* Text color handled by animation when highlighted */
        textShadow: isHovered
          ? '0 0 5px rgba(16, 249, 241, 0.9), 0 0 10px rgba(16, 249, 241, 0.7), 0 0 15px rgba(16, 249, 241, 0.5)'
          : (isHighlighted ? '' : '0 0 5px rgba(16, 249, 241, 0.5), 0 0 10px rgba(16, 249, 241, 0.3), 0 0 15px rgba(16, 249, 241, 0.2)'),
      }}
    >
      {text}
    </button>
  );
};

export default CenterButton;
