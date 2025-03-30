
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface OrbitButtonProps {
  text: string;
  path: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: string;
  startAngle?: number;
  isHighlighted: boolean;
  id: string;
}

interface CategoryData {
  name: string;
  path: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: string;
  startAngle?: number;
  id: string;
}

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
          // Remove transition for box-shadow when hovering to prevent dimming while hovered
          transition: isHovered 
            ? 'opacity 2s ease-in-out, transform 0.3s ease-in-out' 
            : 'box-shadow 2s ease-in-out, opacity 2s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        {text}
      </button>
    </div>
  );
};

const CenterButton: React.FC<{ text: string; size: number; path: string; isHighlighted: boolean; id: string }> = ({ 
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

  // Calculate scale based on hover state
  const scale = isHovered ? 2 : 1;

  return (
    <button 
      id={id}
      onClick={() => navigate(path)} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`tron-button animate-float z-10 rounded-full ${isHighlighted || isHovered ? 'highlighted-button' : 'glow-text'}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        boxShadow: glowIntensity,
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        // Remove transition for box-shadow when hovering to prevent dimming
        transition: isHovered 
          ? 'opacity 2s ease-in-out, transform 0.3s ease-in-out' 
          : 'box-shadow 2s ease-in-out, opacity 2s ease-in-out, transform 0.3s ease-in-out',
        zIndex: isHovered ? 100 : 10,
      }}
    >
      {text}
    </button>
  );
};

const OrbitSystem: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [orbitSize, setOrbitSize] = useState(0);
  const [highlightedButtonId, setHighlightedButtonId] = useState<string | null>(null);
  const [isButtonDimming, setIsButtonDimming] = useState(false);
  const minStartAngle = 40;
  const maxStartAngle = 100;
  
  // Fixed the random angle generation and explicitly set opposing angles
  const [tier1Angle] = useState(() => Math.floor(Math.random() * 360));
  const [tier2Angle] = useState(() => (tier1Angle + (Math.random() * (maxStartAngle - minStartAngle) + minStartAngle) % 360));
  const [tier3Angle] = useState(() => (tier2Angle + (Math.random() * (maxStartAngle - minStartAngle) + minStartAngle) % 360))
  const [tier4Angle] = useState(() => (tier3Angle + (Math.random() * (maxStartAngle - minStartAngle) + minStartAngle) % 360))

  // Calculate opposite angles
  const oppositeTier1Angle = (tier1Angle + 180) % 360;
  const oppositeTier2Angle = (tier2Angle + 180) % 360;
  const oppositeTier3Angle = (tier3Angle + 180) % 360;
  const oppositeTier4Angle = (tier4Angle + 180) % 360;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const minDimension = Math.min(windowSize.width, windowSize.height);
    setOrbitSize(minDimension * 0.4);
  }, [windowSize]);

  // Effect for button highlighting with fixed sequence
  useEffect(() => {
    // Define button highlighting system with proper state management
    const buttonIds = categories.map(category => category.id);
    
    // Select a random button that's not the current highlighted button
    const highlightNextButton = () => {
      setIsButtonDimming(false);
      
      let nextButtonId = highlightedButtonId;
      while (nextButtonId === highlightedButtonId || nextButtonId === null) {
        const randomIndex = Math.floor(Math.random() * buttonIds.length);
        nextButtonId = buttonIds[randomIndex];
      }
      
      setHighlightedButtonId(nextButtonId);
    };

    // Initial highlight
    if (highlightedButtonId === null && buttonIds.length > 0) {
      setHighlightedButtonId(buttonIds[0]);
      return;
    }

    // Sequence: highlight for 3s → dim for 2s → wait for 1s → highlight next
    const startDimming = () => {
      setIsButtonDimming(true);
    };
    
    const handleNextHighlight = () => {
      highlightNextButton();
    };

    // Set up the timeouts for the sequence
    const highlightTimer = setTimeout(startDimming, 3000);
    const waitTimer = isButtonDimming ? setTimeout(handleNextHighlight, 3000) : null;
    
    return () => {
      clearTimeout(highlightTimer);
      if (waitTimer) clearTimeout(waitTimer);
    };
  }, [highlightedButtonId, isButtonDimming]);

  const centerButtonSize = orbitSize * 0.4;
  const tier1ButtonSize = centerButtonSize * 0.75;
  const tier2ButtonSize = tier1ButtonSize * 0.8;
  const tier3ButtonSize = tier2ButtonSize * 0.9;
  const tier4ButtonSize = tier3ButtonSize * 0.9;

  const tier1Radius = orbitSize * 0.4;
  const tier2Radius = orbitSize * 0.68;
  const tier3Radius = orbitSize * 0.85;
  const tier4Radius = orbitSize * 1.1;

  const categories: CategoryData[] = [
    // Center button now has orbitRadius and orbitSpeed set to 0 and empty string
    { name: "About Me", path: "/about", size: centerButtonSize, orbitRadius: 0, orbitSpeed: "", id: "orbit-btn-about-me" },
    
    // Tier 1 - Apps and Games (positioned at exact opposites)
    { name: "Apps", path: "/apps", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: tier1Angle, id: "orbit-btn-apps" },
    { name: "Games", path: "/games", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: oppositeTier1Angle, id: "orbit-btn-games" },
    
    // Tier 2 - Web Sites and Code Examples (positioned at exact opposites)
    { name: "Web Sites", path: "/websites", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: tier2Angle, id: "orbit-btn-websites" },
    { name: "Code Examples", path: "/code", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: oppositeTier2Angle, id: "orbit-btn-code-examples" },
    
    // Tier 3 - 3D Models and 3D Printing (positioned at exact opposites)
    { name: "3D Models", path: "/3d-models", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: tier3Angle, id: "orbit-btn-3d-models" },
    { name: "3D Printing", path: "/3d-printing", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: oppositeTier3Angle, id: "orbit-btn-3d-printing" },
    
    // Tier 4 - Electronics and Other Projects (positioned at exact opposites)
    { name: "Electronics", path: "/electronics", size: tier4ButtonSize, orbitRadius: tier4Radius, orbitSpeed: "animate-orbit-slowest", startAngle: tier4Angle, id: "orbit-btn-electronics" },
    { name: "Other Projects", path: "/other", size: tier4ButtonSize, orbitRadius: tier4Radius, orbitSpeed: "animate-orbit-slowest", startAngle: oppositeTier4Angle, id: "orbit-btn-other-projects" },
  ];

  const centerCategory = categories[0];
  const orbitingCategories = categories.slice(1);

  return (
    <div className="orbit-container">
      <div className="tron-grid"></div>
      
      {/* Using CenterButton instead of OrbitButton for the About Me button */}
      <CenterButton 
        text={centerCategory.name} 
        size={centerCategory.size} 
        path={centerCategory.path}
        isHighlighted={highlightedButtonId === centerCategory.id && !isButtonDimming}
        id={centerCategory.id} 
      />
      
      {orbitingCategories.map((category, index) => (
        <OrbitButton
          key={index}
          text={category.name}
          path={category.path}
          size={category.size}
          orbitRadius={category.orbitRadius}
          orbitSpeed={category.orbitSpeed}
          startAngle={category.startAngle}
          isHighlighted={highlightedButtonId === category.id && !isButtonDimming}
          id={category.id}
        />
      ))}
    </div>
  );
};

export default OrbitSystem;
