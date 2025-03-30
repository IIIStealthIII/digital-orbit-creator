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
  const trailRef = useRef<SVGPathElement>(null);
  const [trailPoints, setTrailPoints] = useState<{x: number, y: number}[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const handleClick = () => {
    navigate(path);
  };

  useEffect(() => {
    // Only add trails for orbiting buttons (not center button)
    if (orbitRadius > 0 && buttonRef.current) {
      const trailLength = 10; // Number of trail points
      const initialPoints = [];
      
      // Create initial trail points
      for (let i = 0; i < trailLength; i++) {
        initialPoints.push({ x: 0, y: 0 });
      }
      
      setTrailPoints(initialPoints);
      
      const updateTrail = () => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Add new point at the current position
          const newTrailPoints = [...trailPoints];
          newTrailPoints.unshift({ x: centerX, y: centerY });
          
          // Remove oldest point
          if (newTrailPoints.length > trailLength) {
            newTrailPoints.pop();
          }
          
          setTrailPoints(newTrailPoints);
        }
        
        requestRef.current = requestAnimationFrame(updateTrail);
      };
      
      requestRef.current = requestAnimationFrame(updateTrail);
      
      return () => {
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [orbitRadius, trailPoints]);

  const style = {
    '--orbit-radius': `${orbitRadius}px`,
    '--glow-color': 'rgba(16, 249, 241, 0.7)',
    width: `${size}px`,
    height: `${size}px`,
    transform: `rotate(${startAngle}deg) translateX(${orbitRadius}px) rotate(-${startAngle}deg)`,
  } as React.CSSProperties;

  return (
    <>
      {orbitRadius > 0 && trailPoints.length > 1 && (
        <svg 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ overflow: 'visible', zIndex: 5 }}
        >
          <path 
            ref={trailRef}
            d={`M ${trailPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none" 
            stroke="rgba(16, 249, 241, 0.3)" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ 
              filter: 'drop-shadow(0 0 3px rgba(16, 249, 241, 0.2))',
            }}
          />
        </svg>
      )}
      <div 
        ref={buttonRef}
        className={`orbit-item ${orbitSpeed}`} 
        style={style}
      >
        <button 
          id={id}
          onClick={handleClick} 
          className="tron-button w-full h-full text-sm md:text-base lg:text-lg opacity-60 rounded-full"
        >
          {text}
        </button>
      </div>
    </>
  );
};

const CenterButton: React.FC<{ text: string; size: number; path: string }> = ({ text, size, path }) => {
  const navigate = useNavigate();
  const [id] = useState(`orbit-btn-${text.replace(/\s+/g, '-').toLowerCase()}`);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    // Random movement boundaries (percentage of size)
    const maxOffset = size * 0.3;
    
    // Current velocity
    let velocityX = (Math.random() * 2 - 1) * 0.5;
    
    const updatePosition = () => {
      // Update position based on velocity - ONLY HORIZONTAL MOVEMENT
      setPosition(prev => {
        let newX = prev.x + velocityX;
        let newY = prev.y; // Keep Y position fixed
        
        // Bounce at boundaries
        if (Math.abs(newX) > maxOffset) {
          velocityX *= -1;
          newX = Math.sign(newX) * maxOffset;
        }
        
        // Randomly change velocity occasionally
        if (Math.random() < 0.01) {
          velocityX += (Math.random() * 0.2 - 0.1);
          
          // Limit maximum velocity
          const maxVelocity = 0.8;
          if (Math.abs(velocityX) > maxVelocity) {
            velocityX = Math.sign(velocityX) * maxVelocity;
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

  return (
    <button 
      id={id}
      onClick={() => navigate(path)} 
      className="tron-button animate-float glow-text z-10 rounded-full"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        boxShadow: '0 0 20px rgba(16, 249, 241, 0.5), 0 0 40px rgba(16, 249, 241, 0.2)',
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {text}
    </button>
  );
};

const OrbitSystem: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [orbitSize, setOrbitSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Calculate the base size based on screen dimensions
    const minDimension = Math.min(windowSize.width, windowSize.height);
    setOrbitSize(minDimension * 0.4); // 40% of smallest screen dimension
  }, [windowSize]);

  // Calculate sizes based on screen dimensions
  const centerButtonSize = orbitSize * 0.33; // 10% larger than before (0.3 * 1.1 = 0.33)
  const tier1ButtonSize = centerButtonSize * 0.75; // 75% of center button
  const tier2ButtonSize = tier1ButtonSize * 0.855; // 95% of previous value (0.9 * 0.95 = 0.855)
  const tier3ButtonSize = tier2ButtonSize * 0.855; // 95% of previous value
  const tier4ButtonSize = tier3ButtonSize * 0.855; // 95% of previous value

  // Calculate orbit radius
  const tier1Radius = orbitSize * 0.35;
  const tier2Radius = orbitSize * 0.55;
  const tier3Radius = orbitSize * 0.75;
  const tier4Radius = orbitSize * 0.95;

  const categories: CategoryData[] = [
    // Center
    { name: "About Me", path: "/about", size: centerButtonSize, orbitRadius: 0, orbitSpeed: "" },
    
    // Tier 1 - Closest orbit (Games and Apps), positioned opposite to each other
    { name: "Games", path: "/games", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: 0 },
    { name: "Apps", path: "/apps", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: 180 },
    
    // Tier 2 - Code Examples and Web Sites (opposites)
    { name: "Code Examples", path: "/code", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: 90 },
    { name: "Web Sites", path: "/websites", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: 270 },
    
    // Tier 3 - 3D Printing and 3D Models (opposites)
    { name: "3D Printing", path: "/3d-printing", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: 45 },
    { name: "3D Models", path: "/3d-models", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: 225 },
    
    // Tier 4 - Electronics and Other Projects (opposites)
    { name: "Electronics", path: "/electronics", size: tier4ButtonSize, orbitRadius: tier4Radius, orbitSpeed: "animate-orbit-slowest", startAngle: 135 },
    { name: "Other Projects", path: "/other", size: tier4ButtonSize, orbitRadius: tier4Radius, orbitSpeed: "animate-orbit-slowest", startAngle: 315 },
  ];

  const centerCategory = categories[0];
  const orbitingCategories = categories.slice(1);

  return (
    <div className="orbit-container">
      <div className="tron-grid"></div>
      
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
