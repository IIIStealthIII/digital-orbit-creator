
import React, { useRef, useEffect, useState } from 'react';
import { findClosestTarget, applyTargetEffects } from '@/utils/targetUtils';
import { ParticleData, Waypoint } from '@/types/particle';

interface LightningParticlesProps {
  mousePosition: { x: number, y: number };
  targets: Element[];
  isInWindow: boolean;
}

const LightningParticles: React.FC<LightningParticlesProps> = ({ 
  mousePosition, 
  targets,
  isInWindow
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<ParticleData[]>([]);
  const requestRef = useRef<number>();
  const [activeTarget, setActiveTarget] = useState<Element | null>(null);
  const lastCreateTime = useRef<number>(0);

  // Create lightning particles
  useEffect(() => {
    if (!isInWindow) return;

    const createLightningEffect = () => {
      if (!containerRef.current) return;
      
      const now = Date.now();
      if (now - lastCreateTime.current < 50) return; // Only create particles every 50ms (0.05 seconds)
      lastCreateTime.current = now;

      // Create lightning particles
      const createParticle = (): ParticleData | null => {
        if (!containerRef.current) return null;
        
        const particle = document.createElement('div');
        particle.className = 'lightning-particle';
        
        // Random angle
        const angle = Math.random() * Math.PI * 2;
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
        const waypoints: Waypoint[] = [];
        
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
        
        let targetId = '';
        
        // Check for attraction to targets
        const closestTarget = findClosestTarget(
          targets,
          mousePosition.x, 
          mousePosition.y, 
          window.innerWidth * 0.1
        );
        
        if (closestTarget) {
          // Adjust end position to target
          waypoints[zigzagCount] = {
            x: closestTarget.centerX,
            y: closestTarget.centerY
          };
          
          targetId = closestTarget.id;
          
          // If this is a new target, set it as active
          if (activeTarget !== closestTarget.element) {
            setActiveTarget(closestTarget.element);
          }
        }
        
        containerRef.current.appendChild(particle);
        
        return {
          element: particle,
          startTime: now,
          duration,
          waypoints,
          currentWaypointIndex: 0,
          targetId
        };
      };

      // Create 2-3 particles
      const count = 1 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < count; i++) {
        const particleData = createParticle();
        if (particleData) {
          particlesRef.current.push(particleData);
        }
      }
    };

    // Generate particles constantly regardless of mouse movement
    const particleInterval = setInterval(createLightningEffect, 50); // 50ms (0.05 seconds)

    return () => {
      clearInterval(particleInterval);
    };
  }, [mousePosition, activeTarget, targets, isInWindow]);

  // Update particles
  useEffect(() => {
    const updateParticles = () => {
      if (!containerRef.current) return;

      const now = Date.now();
      const deadParticles: ParticleData[] = [];
      const activeTargetIds = new Set<string>();

      // Update existing particles
      for (const particle of particlesRef.current) {
        const { element, startTime, duration, waypoints, currentWaypointIndex, targetId } = particle;
        
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
            particle.currentWaypointIndex += 1;
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
          element.style.left = `${currentX}px`;
          element.style.top = `${currentY}px`;
          
          // Fade out
          element.style.opacity = (1 - progress).toString();
          
          // Make it grow slightly as it moves
          const scale = 1 + progress * 0.5;
          element.style.transform = `scale(${scale})`;
          
          // Change color slightly toward the end
          const hue = 180 - progress * 20; // From cyan (180) toward slightly blue
          element.style.backgroundColor = `hsl(${hue}, 95%, 60%)`;
          element.style.boxShadow = `0 0 ${6 + progress * 4}px ${2 + progress * 2}px rgba(16, 249, 241, ${0.6 - progress * 0.4})`;
          
          // Track active targets
          if (targetId) {
            activeTargetIds.add(targetId);
          }
        } else {
          // Mark for removal
          deadParticles.push(particle);
        }
      }

      // Remove dead particles
      for (const particle of deadParticles) {
        if (containerRef.current && containerRef.current.contains(particle.element)) {
          containerRef.current.removeChild(particle.element);
        }
        particlesRef.current = particlesRef.current.filter(p => p !== particle);
      }

      // Apply effects to targets
      applyTargetEffects(targets, activeTargetIds, now);

      // Continue animation
      requestRef.current = requestAnimationFrame(updateParticles);
    };

    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [targets]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Remove all particles
      if (containerRef.current) {
        particlesRef.current.forEach(particle => {
          if (containerRef.current?.contains(particle.element)) {
            containerRef.current.removeChild(particle.element);
          }
        });
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50"
    />
  );
};

export default LightningParticles;
