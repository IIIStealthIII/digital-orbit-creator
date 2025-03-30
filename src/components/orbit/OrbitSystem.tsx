
import React, { useEffect, useState } from 'react';
import OrbitButton from './OrbitButton';
import CenterButton from './CenterButton';
import { CategoryData } from './types';

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
  const [tier3Angle] = useState(() => (tier2Angle + (Math.random() * (maxStartAngle - minStartAngle) + minStartAngle) % 360));
  const [tier4Angle] = useState(() => (tier3Angle + (Math.random() * (maxStartAngle - minStartAngle) + minStartAngle) % 360));

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
