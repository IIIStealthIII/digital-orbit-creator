
import React, { useEffect, useRef, useState } from 'react';

interface CursorEffectProps {
  targetSelector?: string;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ targetSelector }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [activeTarget, setActiveTarget] = useState<Element | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const targetsRef = useRef<Element[]>([]);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const movementTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      // Reset movement timer
      if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
      }
      
      // Set a timer to detect when movement stops
      movementTimerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
      
      // Update last position
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (targetSelector) {
      targetsRef.current = Array.from(document.querySelectorAll(targetSelector));
    }
  }, [targetSelector]);

  useEffect(() => {
    const createLightningEffect = () => {
      if (!containerRef.current || !isMoving) return;

      // Create lightning particles
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'lightning-particle';
        
        // Random angle
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        const distance = window.innerWidth * 0.15; // 15% of screen width
        const duration = 400 + Math.random() * 200; // 0.4 - 0.6 seconds
        
        // Initial position at cursor
        particle.style.left = `${mousePosition.x}px`;
        particle.style.top = `${mousePosition.y}px`;
        
        // Calculate end position with zigzag path
        const endX = mousePosition.x + Math.cos(angle) * distance;
        const endY = mousePosition.y + Math.sin(angle) * distance;
        
        // Generate zigzag waypoints
        const zigzagCount = 3 + Math.floor(Math.random() * 3); // 3-5 zigzags
        const waypoints = [];
        
        for (let i = 0; i <= zigzagCount; i++) {
          const progress = i / zigzagCount;
          const baseX = mousePosition.x + (endX - mousePosition.x) * progress;
          const baseY = mousePosition.y + (endY - mousePosition.y) * progress;
          
          // Add randomness to zigzag
          const deviation = 15 + Math.random() * 20;
          const deviationAngle = Math.random() * Math.PI * 2;
          
          waypoints.push({
            x: baseX + Math.cos(deviationAngle) * deviation,
            y: baseY + Math.sin(deviationAngle) * deviation
          });
        }
        
        // First waypoint is always the starting position
        waypoints[0] = { x: mousePosition.x, y: mousePosition.y };
        // Last waypoint is the end position (unless attracted to a target)
        waypoints[zigzagCount] = { x: endX, y: endY };
        
        particle.dataset.waypoints = JSON.stringify(waypoints);
        particle.dataset.currentWaypointIndex = '0';
        
        // Check for attraction to targets
        let attractedToTarget = false;
        let targetElement: Element | null = null;
        let closestTargetDistance = Infinity;
        
        targetsRef.current.forEach(target => {
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
          if (targetDistance < attractionThreshold && targetDistance < closestTargetDistance) {
            attractedToTarget = true;
            targetElement = target;
            closestTargetDistance = targetDistance;
            
            // Adjust end position to target
            const targetAngle = Math.atan2(
              targetCenterY - mousePosition.y,
              targetCenterX - mousePosition.x
            );
            
            // Set the last waypoint to aim at the target
            waypoints[zigzagCount] = {
              x: targetCenterX,
              y: targetCenterY
            };
            
            // Update waypoints
            particle.dataset.waypoints = JSON.stringify(waypoints);
          }
        });
        
        particle.dataset.targetId = targetElement ? targetElement.id : '';
        particle.dataset.startTime = Date.now().toString();
        particle.dataset.duration = duration.toString();
        
        containerRef.current?.appendChild(particle);
        return { element: particle, targetElement };
      };

      // Create 2-3 particles
      const count = 2 + Math.floor(Math.random() * 2);
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
        const targetId = particle.dataset.targetId;
        const waypointsString = particle.dataset.waypoints || '[]';
        const waypoints = JSON.parse(waypointsString);
        const currentWaypointIndex = parseInt(particle.dataset.currentWaypointIndex || '0');
        
        const progress = Math.min(1, (now - startTime) / duration);
        
        if (progress < 1) {
          // Get current and next waypoint
          const currentWaypoint = waypoints[currentWaypointIndex];
          const nextWaypointIndex = Math.min(currentWaypointIndex + 1, waypoints.length - 1);
          const nextWaypoint = waypoints[nextWaypointIndex];
          
          // Calculate segment progress (from 0 to 1 within this segment)
          const segmentDuration = duration / (waypoints.length - 1);
          const segmentStartTime = startTime + currentWaypointIndex * segmentDuration;
          const segmentProgress = Math.min(1, (now - segmentStartTime) / segmentDuration);
          
          // Move to next waypoint if needed
          if (segmentProgress >= 1 && currentWaypointIndex < waypoints.length - 1) {
            particle.dataset.currentWaypointIndex = (currentWaypointIndex + 1).toString();
          }
          
          // Interpolate position between waypoints
          const currentX = currentWaypoint.x + (nextWaypoint.x - currentWaypoint.x) * segmentProgress;
          const currentY = currentWaypoint.y + (nextWaypoint.y - currentWaypoint.y) * segmentProgress;
          
          // Check if particle has reached a target
          if (targetId) {
            const target = document.getElementById(targetId);
            if (target) {
              const rect = target.getBoundingClientRect();
              const targetCenterX = rect.left + rect.width / 2;
              const targetCenterY = rect.top + rect.height / 2;
              
              // Calculate distance to target center
              const distanceToTarget = Math.sqrt(
                Math.pow(currentX - targetCenterX, 2) + 
                Math.pow(currentY - targetCenterY, 2)
              );
              
              // If very close to target, absorb the particle
              if (distanceToTarget < rect.width / 2) {
                // Target hit effect
                if (target instanceof HTMLElement) {
                  target.classList.add('tron-button-highlight');
                  target.style.transform = 'scale(1.25)';
                  target.dataset.lastHit = now.toString();
                }
                
                // Mark particle for removal
                deadParticles.push(particle);
                continue;
              }
            }
          }
          
          // Update position
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

    // Generate particles while mouse is moving
    const particleInterval = setInterval(createLightningEffect, 50);
    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      clearInterval(particleInterval);
      cancelAnimationFrame(requestRef.current as number);
    };
  }, [mousePosition, activeTarget, isMoving]);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50"
    />
  );
};

export default CursorEffect;
