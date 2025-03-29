
import React, { useEffect, useState } from 'react';
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

  const handleClick = () => {
    navigate(path);
  };

  const style = {
    '--orbit-radius': `${orbitRadius}px`,
    '--glow-color': 'rgba(16, 249, 241, 0.7)',
    width: `${size}px`,
    height: `${size}px`,
    transform: `rotate(${startAngle}deg) translateX(${orbitRadius}px) rotate(-${startAngle}deg)`,
  } as React.CSSProperties;

  return (
    <div 
      className={`orbit-item ${orbitSpeed}`} 
      style={style}
    >
      <button 
        id={id}
        onClick={handleClick} 
        className="tron-button w-full h-full text-sm md:text-base lg:text-lg opacity-60"
      >
        {text}
      </button>
    </div>
  );
};

const CenterButton: React.FC<{ text: string; size: number; path: string }> = ({ text, size, path }) => {
  const navigate = useNavigate();
  const [id] = useState(`orbit-btn-${text.replace(/\s+/g, '-').toLowerCase()}`);

  return (
    <button 
      id={id}
      onClick={() => navigate(path)} 
      className="tron-button animate-float glow-text z-10"
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        boxShadow: '0 0 20px rgba(16, 249, 241, 0.5), 0 0 40px rgba(16, 249, 241, 0.2)',
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
  const centerButtonSize = orbitSize * 0.3; // 30% of orbit size
  const tier1ButtonSize = centerButtonSize * 0.75; // 75% of center button
  const tier2ButtonSize = tier1ButtonSize * 0.9; // 90% of tier 1
  const tier3ButtonSize = tier2ButtonSize * 0.9; // 90% of tier 2
  const tier4ButtonSize = tier3ButtonSize * 0.9; // 90% of tier 3

  // Calculate orbit radius
  const tier1Radius = orbitSize * 0.35;
  const tier2Radius = orbitSize * 0.55;
  const tier3Radius = orbitSize * 0.75;
  const tier4Radius = orbitSize * 0.95;

  const categories: CategoryData[] = [
    // Center
    { name: "About Me", path: "/about", size: centerButtonSize, orbitRadius: 0, orbitSpeed: "" },
    
    // Tier 1 - Closest orbit (Games and Apps)
    { name: "Games", path: "/games", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: 0 },
    { name: "Apps", path: "/apps", size: tier1ButtonSize, orbitRadius: tier1Radius, orbitSpeed: "animate-orbit", startAngle: 180 },
    
    // Tier 2
    { name: "Code Examples", path: "/code", size: tier2ButtonSize, orbitRadius: tier2Radius, orbitSpeed: "animate-orbit-slow", startAngle: 45 },
    
    // Tier 3
    { name: "3D Printing", path: "/3d-printing", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: 90 },
    { name: "3D Models", path: "/3d-models", size: tier3ButtonSize, orbitRadius: tier3Radius, orbitSpeed: "animate-orbit-slower", startAngle: 190 },
    
    // Tier 4 - Furthest orbit
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
