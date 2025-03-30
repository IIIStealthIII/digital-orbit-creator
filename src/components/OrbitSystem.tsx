
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface OrbitButtonProps {
  text: string;
  path: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: string;
  startAngle?: number;
}

interface CategoryData {
  name: string;
  path: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: string;
  startAngle?: number;
}

const OrbitButton: React.FC<OrbitButtonProps> = ({ 
  text, 
  path, 
  size, 
  orbitRadius, 
  orbitSpeed,
  startAngle = 0
}) => {
  const navigate = useNavigate();
  const [id] = useState(`orbit-btn-${text.replace(/\s+/g, '-').toLowerCase()}`);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const glowRef = useRef<number | null>(null);

  useEffect(() => {
    // Set up random interval for glow animation
    const setupGlowAnimation = () => {
      // Clear any existing timeout
      if (glowRef.current) clearTimeout(glowRef.current);

      // Random duration between 2-7 seconds for glow cycle
      const glowDuration = Math.random() * 5000 + 2000;
      
      // Set new intensity (between 0.3 and 1)
      const newIntensity = Math.random() * 0.7 + 0.3;
      setGlowIntensity(newIntensity);
      
      // Schedule next glow change
      glowRef.current = window.setTimeout(setupGlowAnimation, glowDuration);
    };
    
    // Start the glow animation
    setupGlowAnimation();
    
    return () => {
      if (glowRef.current) clearTimeout(glowRef.current);
    };
  }, []);

  const handleClick = () => {
    navigate(path);
  };

  // Fixed style calculation to correctly position the button at its start angle
  const style = {
    '--orbit-radius': `${orbitRadius}px`,
    '--glow-color': 'rgba(16, 249, 241, 0.7)',
    '--start-angle': `${startAngle}deg`,
    width: `${size}px`,
    height: `${size}px`,
    // Use translateX to position at the orbit radius, then rotate around the center
    transform: `rotate(${startAngle}deg) translateX(${orbitRadius}px) rotate(-${startAngle}deg)`,
  } as React.CSSProperties;

  return (
    <div 
      className={`orbit-item ${orbitSpeed}`} 
      style={style}
      data-angle={startAngle} // Adding data attribute for debugging
    >
      <button 
        id={id}
        onClick={handleClick} 
        className="tron-button w-full h-full text-sm md:text-base lg:text-lg opacity-60 rounded-full"
        style={{
          boxShadow: `0 0 ${10 + glowIntensity * 20}px rgba(16, 249, 241, ${glowIntensity})`,
          borderColor: `rgba(16, 249, 241, ${0.3 + glowIntensity * 0.7})`,
          transition: 'box-shadow 1.5s ease-in-out, border-color 1.5s ease-in-out'
        }}
      >
        {text}
      </button>
    </div>
  );
};

const CenterButton: React.FC<{ text: string; size: number; path: string }> = ({ text, size, path }) => {
  const navigate = useNavigate();
  const [id] = useState(`orbit-btn-${text.replace(/\s+/g, '-').toLowerCase()}`);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [glowIntensity, setGlowIntensity] = useState(0.5);
  const animationRef = useRef<number>();
  const glowRef = useRef<number | null>(null);

  useEffect(() => {
    // Set up random interval for glow animation
    const setupGlowAnimation = () => {
      // Clear any existing timeout
      if (glowRef.current) clearTimeout(glowRef.current);

      // Random duration between 2-6 seconds for glow cycle
      const glowDuration = Math.random() * 4000 + 2000;
      
      // Set new intensity (between 0.5 and 1)
      const newIntensity = Math.random() * 0.5 + 0.5;
      setGlowIntensity(newIntensity);
      
      // Schedule next glow change
      glowRef.current = window.setTimeout(setupGlowAnimation, glowDuration);
    };
    
    // Start the glow animation
    setupGlowAnimation();

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
      if (glowRef.current) {
        clearTimeout(glowRef.current);
      }
    };
  }, [size]);

  return (
    <button 
      id={id}
      onClick={() => navigate(path)} 
      className="tron-button animate-float glow-text z-10 rounded-full"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        boxShadow: `0 0 ${20 + glowIntensity * 30}px rgba(16, 249, 241, ${glowIntensity}), 0 0 ${40 + glowIntensity * 20}px rgba(16, 249, 241, ${glowIntensity * 0.4})`,
        borderColor: `rgba(16, 249, 241, ${0.4 + glowIntensity * 0.6})`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'box-shadow 1.5s ease-in-out, border-color 1.5s ease-in-out',
      }}
    >
      {text}
    </button>
  );
};

const OrbitSystem: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [orbitSize, setOrbitSize] = useState(0);
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

  const centerButtonSize = orbitSize * 0.4;
  const tier1ButtonSize = centerButtonSize * 0.75;
  const tier2ButtonSize = tier1ButtonSize * 0.8;
  const tier3ButtonSize = tier2ButtonSize * 0.9;
  const tier4ButtonSize = tier3ButtonSize * 0.9;

  const tier1Radius = orbitSize * 0.4;
  const tier2Radius = orbitSize * 0.68;
  const tier3Radius = orbitSize * 0.85;
  const tier4Radius = orbitSize * 1.1;

  // Log angles for debugging
  console.log("Tier 1 angles:", tier1Angle, oppositeTier1Angle);
  console.log("Tier 2 angles:", tier2Angle, oppositeTier2Angle);
  console.log("Tier 3 angles:", tier3Angle, oppositeTier3Angle);
  console.log("Tier 4 angles:", tier4Angle, oppositeTier4Angle);

  const categories: CategoryData[] = [
    // Center button now has orbitRadius and orbitSpeed set to 0 and empty string
    { name: "About Me", path: "/about", size: centerButtonSize, orbitRadius: 0, orbitSpeed: "" },
    
    // Tier 1 - Apps and Games (positioned at exact opposites)
    { name: "Apps", path: "/apps", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: tier1Angle },
    { name: "Games", path: "/games", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: oppositeTier1Angle },
    
    // Tier 2 - Web Sites and Code Examples (positioned at exact opposites)
    { name: "Web Sites", path: "/websites", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: tier2Angle },
    { name: "Code Examples", path: "/code", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: oppositeTier2Angle },
    
    // Tier 3 - 3D Models and 3D Printing (positioned at exact opposites)
    { name: "3D Models", path: "/3d-models", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: tier3Angle },
    { name: "3D Printing", path: "/3d-printing", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: oppositeTier3Angle },
    
    // Tier 4 - Electronics and Other Projects (positioned at exact opposites)
    { name: "Electronics", path: "/electronics", size: tier4ButtonSize, orbitRadius: tier4Radius, orbitSpeed: "animate-orbit-slowest", startAngle: tier4Angle },
    { name: "Other Projects", path: "/other", size: tier4ButtonSize, orbitRadius: tier4Radius, orbitSpeed: "animate-orbit-slowest", startAngle: oppositeTier4Angle },
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
        />
      ))}
    </div>
  );
};

export default OrbitSystem;
