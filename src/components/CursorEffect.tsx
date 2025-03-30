import React, { useEffect, useRef, useState } from 'react';

interface CursorEffectProps {
  targetSelector?: string;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ targetSelector }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTarget, setActiveTarget] = useState<Element | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const targetsRef = useRef<Element[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (targetSelector) {
      targetsRef.current = Array.from(document.querySelectorAll(targetSelector));
    }
  }, [targetSelector]);

  useEffect(() => {
    const createLightningEffect = () => {
      if (!containerRef.current) return;

      // Create lightning particles
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'lightning-particle';
        
        // Random angle
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        const distance = window.innerWidth * 0.15; // 15% of screen width
        const duration = 400 + Math.random() * 200; // 0.4 - 0.6 seconds
        
        // Initial position
        particle.style.left = `${mousePosition.x}px`;
        particle.style.top = `${mousePosition.y}px`;
        
        // Calculate end position
        const endX = mousePosition.x + Math.cos(angle) * distance;
        const endY = mousePosition.y + Math.sin(angle) * distance;
        
        // Check for attraction to targets
        let attractedToTarget = false;
        let targetElement: Element | null = null;
        
        targetsRef.current.forEach(target => {
          if (attractedToTarget) return;
          
          const rect = target.getBoundingClientRect();
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          
          // Calculate distance to target
          const targetDistance = Math.sqrt(
            Math.pow(mousePosition.x - targetCenterX, 2) + 
            Math.pow(mousePosition.y - targetCenterY, 2)
          );
          
          // If close enough to target (10% of screen width)
          const attractionThreshold = window.innerWidth * 0.1;
          if (targetDistance < attractionThreshold) {
            attractedToTarget = true;
            targetElement = target;
            
            // Adjust end position to target
            const targetAngle = Math.atan2(
              targetCenterY - mousePosition.y,
              targetCenterX - mousePosition.x
            );
            
            const adjustedSpeed = speed * 1.2;
            const adjustedTargetDistance = targetDistance * 0.8;
            
            const newEndX = mousePosition.x + Math.cos(targetAngle) * adjustedTargetDistance;
            const newEndY = mousePosition.y + Math.sin(targetAngle) * adjustedTargetDistance;
            
            // Blend original and target directions
            const blendFactor = 0.7; // 70% toward target, 30% original direction
            particle.dataset.endX = (endX * (1 - blendFactor) + newEndX * blendFactor).toString();
            particle.dataset.endY = (endY * (1 - blendFactor) + newEndY * blendFactor).toString();
          }
        });
        
        if (!attractedToTarget) {
          particle.dataset.endX = endX.toString();
          particle.dataset.endY = endY.toString();
        }
        
        particle.dataset.targetId = targetElement ? targetElement.id : '';
        particle.dataset.startTime = Date.now().toString();
        particle.dataset.duration = duration.toString();
        
        containerRef.current?.appendChild(particle);
        return { element: particle, targetElement };
      };

      // Create 3-5 particles
      const count = 3 + Math.floor(Math.random() * 3);
      const newParticles = [];
      
      const targetHitCounts: Record<string, number> = {};
      
      for (let i = 0; i < count; i++) {
        const { element, targetElement } = createParticle();
        newParticles.push(element);
        
        // Track hits to targets
        if (targetElement && targetElement.id) {
          targetHitCounts[targetElement.id] = (targetHitCounts[targetElement.id] || 0) + 1;
          
          // If this is a new target or has more hits, set it as active
          if (activeTarget !== targetElement) {
            setActiveTarget(targetElement);
          }
        }
      }
      
      particlesRef.current = [...particlesRef.current, ...newParticles];
    };

    const updateParticles = () => {
      if (!containerRef.current) return;

      const now = Date.now();
      const deadParticles = [];

      // Update existing particles
      for (const particle of particlesRef.current) {
        const startTime = parseInt(particle.dataset.startTime || '0');
        const duration = parseInt(particle.dataset.duration || '500');
        const endX = parseFloat(particle.dataset.endX || '0');
        const endY = parseFloat(particle.dataset.endY || '0');
        const targetId = particle.dataset.targetId;
        
        const progress = Math.min(1, (now - startTime) / duration);
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        
        if (progress < 1) {
          // Update position
          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + (endY - startY) * progress;
          
          particle.style.left = `${currentX}px`;
          particle.style.top = `${currentY}px`;
          
          // Fade out
          particle.style.opacity = (1 - progress).toString();
          
          // Make it grow slightly as it moves
          const scale = 1 + progress * 0.5;
          particle.style.transform = `scale(${scale})`;
          
          // Change color slightly toward the end
          const hue = 180 - progress * 20; // From cyan (180) toward slightly blue
          particle.style.backgroundColor = `hsl(${hue}, 95%, 60%)`;
          particle.style.boxShadow = `0 0 ${6 + progress * 4}px ${2 + progress * 2}px rgba(16, 249, 241, ${0.6 - progress * 0.4})`;
        } else {
          // Mark for removal
          deadParticles.push(particle);
        }
      }

      // Remove dead particles
      for (const particle of deadParticles) {
        containerRef.current.removeChild(particle);
        particlesRef.current = particlesRef.current.filter(p => p !== particle);
      }

      // Check if any particles are hitting targets
      const activeTargetIds = new Set<string>();
      particlesRef.current.forEach(particle => {
        const targetId = particle.dataset.targetId;
        if (targetId) {
          activeTargetIds.add(targetId);
        }
      });

      // Apply effects to targets
      targetsRef.current.forEach(target => {
        if (activeTargetIds.has(target.id)) {
          // Target is being hit by lightning
          if (target instanceof HTMLElement) {
            target.classList.add('tron-button-highlight');
            target.style.transform = 'scale(1.25)';
            target.dataset.lastHit = now.toString();
          }
        } else if (target instanceof HTMLElement && target.dataset.lastHit) {
          // Check if 2 seconds have passed since last hit
          const lastHit = parseInt(target.dataset.lastHit);
          if (now - lastHit > 2000) {
            target.classList.remove('tron-button-highlight');
            target.style.transform = '';
            delete target.dataset.lastHit;
          }
        }
      });

      // Continue animation
      requestRef.current = requestAnimationFrame(updateParticles);
    };

    // Start lightning effects at certain interval
    const lightningInterval = setInterval(createLightningEffect, 100);
    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      clearInterval(lightningInterval);
      cancelAnimationFrame(requestRef.current as number);
    };
  }, [mousePosition, activeTarget]);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50"
    />
  );
};

export default CursorEffect;
