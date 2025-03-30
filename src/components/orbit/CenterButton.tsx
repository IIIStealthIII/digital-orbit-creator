
import React, { useState, useRef, useEffect } from 'react';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const maxOffset = size * 0.3;
    
    let velocityX = (Math.random() * 2 - 1) * 0.5;
    let velocityY = (Math.random() * 2 - 1) * 0.5;
    
    const updatePosition = () => {
      setPosition(prev => {
        let newX = prev.x + velocityX;
        let newY = prev.y + velocityY;
        
        if (Math.abs(newX) > maxOffset) {
          velocityX *= -1;
          newX = Math.sign(newX) * maxOffset;
        }
        
        if (Math.abs(newY) > maxOffset) {
          velocityY *= -1;
          newY = Math.sign(newY) * maxOffset;
        }
        
        if (Math.random() < 0.01) {
          velocityX += (Math.random() * 0.2 - 0.1);
          velocityY += (Math.random() * 0.2 - 0.1);
          
          const maxVelocity = 0.8;
          const currentVelocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
          if (currentVelocity > maxVelocity) {
            velocityX = (velocityX / currentVelocity) * maxVelocity;
            velocityY = (velocityY / currentVelocity) * maxVelocity;
          }
        }
        
        return { x: newX, y: newY };
      });
      
      animationRef.current = requestAnimationFrame(updatePosition);
    };
    
    animationRef.current = requestAnimationFrame(updatePosition);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size]);

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

  // Update the scale to make it grow twice as big on hover (from 1 to 2)
  const scale = isHovered ? 2 : 1;

  return (
    <button 
      id={id}
      onClick={() => navigate(path)} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`tron-button animate-float z-10 rounded-full ${isHovered ? 'hover-highlighted' : (isHighlighted ? 'highlighted-button' : 'glow-text')}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        boxShadow: glowIntensity,
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        // Improve transitions to include text color/shadow for a consistent experience
        transition: isHovered 
          ? 'transform 0.3s ease-in-out' 
          : 'box-shadow 2s ease-in-out, transform 0.3s ease-in-out, color 2s ease-in-out, text-shadow 2s ease-in-out',
        zIndex: isHovered ? 100 : 10,
        // Improved text color transition that goes from bright to dim
        color: isHighlighted 
          ? 'rgba(16, 249, 241, 1)' /* Bright cyan when highlighted */
          : 'rgba(16, 249, 241, 0.7)', /* Dimmer cyan when not highlighted */
        textShadow: isHighlighted 
          ? '0 0 5px rgba(16, 249, 241, 0.9), 0 0 10px rgba(16, 249, 241, 0.7), 0 0 15px rgba(16, 249, 241, 0.5)'
          : '0 0 5px rgba(16, 249, 241, 0.5), 0 0 10px rgba(16, 249, 241, 0.3), 0 0 15px rgba(16, 249, 241, 0.2)',
      }}
    >
      {text}
    </button>
  );
};

export default CenterButton;
