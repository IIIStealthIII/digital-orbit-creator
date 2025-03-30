
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrbitButtonProps } from './types';

const OrbitButton: React.FC<OrbitButtonProps> = ({ 
  text, 
  path, 
  size, 
  orbitRadius, 
  orbitSpeed,
  startAngle = 0,
  isHighlighted,
  id
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(path);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Base glow effect that's consistent before and after highlighting
  const baseGlow = '0 0 15px rgba(16, 249, 241, 0.7), 0 0 25px rgba(16, 249, 241, 0.3)';
  
  // Enhanced glow for highlighted state (system highlighting)
  const highlightedGlow = '0 0 30px rgba(16, 249, 241, 0.9), 0 0 50px rgba(16, 249, 241, 0.7), 0 0 70px rgba(16, 249, 241, 0.5)';
  
  // Even more enhanced glow for hover state
  const hoverGlow = '0 0 40px rgba(16, 249, 241, 1), 0 0 60px rgba(16, 249, 241, 0.8), 0 0 80px rgba(16, 249, 241, 0.6)';

  // Choose the appropriate glow based on state
  // If hovered, always use the hover glow regardless of highlight state
  const glowIntensity = isHovered ? hoverGlow : (isHighlighted ? highlightedGlow : baseGlow);

  // Calculate scale transform based on hover state
  const scale = isHovered ? 2 : 1;

  // Fixed style calculation to correctly position the button at its start angle
  const style = {
    '--orbit-radius': `${orbitRadius}px`,
    '--glow-color': 'rgba(16, 249, 241, 0.7)',
    '--start-angle': `${startAngle}deg`,
    width: `${size}px`,
    height: `${size}px`,
    // Use translateX to position at the orbit radius, then rotate around the center
    transform: `rotate(${startAngle}deg) translateX(${orbitRadius}px) rotate(-${startAngle}deg)`,
    transition: 'box-shadow 2s ease-in-out, transform 0.3s ease-in-out',
    zIndex: isHovered ? 100 : 'auto',
  } as React.CSSProperties;

  return (
    <div 
      className={`orbit-item ${orbitSpeed}`} 
      style={style}
      data-angle={startAngle}
    >
      <button 
        id={id}
        onClick={handleClick} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`tron-button w-full h-full text-sm md:text-base lg:text-lg rounded-full ${isHighlighted || isHovered ? 'highlighted-button' : 'opacity-60'}`}
        style={{
          boxShadow: glowIntensity,
          transform: `scale(${scale})`,
          // Important change: We maintain separate transitions for different states
          // When hovering, don't include box-shadow in the transition to prevent dimming
          // When not hovering, include box-shadow transition for smooth return to normal state
          transition: isHovered 
            ? 'transform 0.3s ease-in-out' 
            : 'box-shadow 2s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default OrbitButton;
