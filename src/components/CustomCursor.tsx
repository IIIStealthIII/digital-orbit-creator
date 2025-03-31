import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CustomCursor: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    size: number;
    opacity: number;
    color: string;
    lifetime: number;
  }>>([]);
  const [orbitDots, setOrbitDots] = useState<Array<{
    id: number;
    angle: number;
  }>>([]);
  const nextParticleId = useRef(0);
  const nextOrbitDotId = useRef(0);
  const orbitSpeed = useRef(1);
  const lastCursorPosition = useRef({ x: 0, y: 0 });
  const cursorVelocity = useRef({ x: 0, y: 0 });

  // Colors for particles
  const particleColors = [
    'rgba(16, 249, 241, 0.8)', // Tron cyan
    'rgb(43, 0, 255)',   // Tron blue
    'rgba(255, 255, 255, 0.6)', // White
    'rgba(0, 195, 255, 0.7)', // Light blue
  ];

  // Initialize orbit dots
  useEffect(() => {
    const dotsCount = 12; // Number of dots around the circle
    const newDots = [];
    
    for (let i = 0; i < dotsCount; i++) {
      newDots.push({
        id: nextOrbitDotId.current++,
        angle: (i * 360) / dotsCount,
      });
    }
    
    setOrbitDots(newDots);
  }, []);

  // Update orbit dots positions
  useEffect(() => {
    const updateOrbitDots = () => {
      setOrbitDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          angle: (dot.angle + orbitSpeed.current) % 360
        }))
      );
      
      requestAnimationFrame(updateOrbitDots);
    };
    
    const animationId = requestAnimationFrame(updateOrbitDots);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const cursorRing = cursorRingRef.current;
    
    if (!cursorRing) return;

    // Add custom cursor styles to the body
    document.body.classList.add('cursor-none');
    
    let lastX = 0;
    let lastY = 0;
    let lastMoveTime = Date.now();
    
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Position the ring with slight delay for trailing effect
      cursorRing.style.left = `${clientX}px`;
      cursorRing.style.top = `${clientY}px`;

      // Calculate cursor velocity for particle generation
      const now = Date.now();
      const timeDiff = now - lastMoveTime;
      if (timeDiff > 0) {
        // Calculate cursor velocity
        const deltaX = clientX - lastX;
        const deltaY = clientY - lastY;
        
        // Store current cursor position and velocity for particle generation
        lastCursorPosition.current = { x: clientX, y: clientY };
        cursorVelocity.current = { 
          x: deltaX / timeDiff,
          y: deltaY / timeDiff
        };
        
        const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        const speed = distance / timeDiff;
        
        // Adjust orbit speed based on cursor speed
        if (isPointer) {
          orbitSpeed.current = Math.min(5, 1 + speed * 5);
        } else {
          orbitSpeed.current = Math.min(2, 0.5 + speed * 1.5);
        }
        
        // Only emit particles if cursor is moving fast enough
        if (speed > 0.05) {
          // Adjust particle count based on page
          const particleCount = Math.min(Math.floor(speed * (isHomePage ? 2.4 : 1.8)), isHomePage ? 10 : 6);
          for (let i = 0; i < particleCount; i++) {
            createParticle(clientX, clientY, -deltaX, -deltaY);
          }
        }
      }
      
      lastX = clientX;
      lastY = clientY;
      lastMoveTime = now;
    };

    const createParticle = (x: number, y: number, velocityX: number, velocityY: number) => {
      const id = nextParticleId.current++;
      const size = Math.random() * 5 + 2; // Random size between 2-7px
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      
      // Set lifetime based on current page
      // Home page (splash): 2000-2500ms lifetime
      // Other pages: 400-600ms lifetime (significantly shorter)
      const lifetime = isHomePage 
        ? Math.random() * 500 + 2000  // 2000-2500ms for home page
        : Math.random() * 200 + 400;  // 400-600ms for other pages
      
      // Add slight random offset to particle position
      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = (Math.random() - 0.5) * 10;
      
      // Create backwards velocity (opposite of cursor direction) with some randomness
      const speed = Math.sqrt(velocityX*velocityX + velocityY*velocityY);
      const normalizedVx = speed > 0 ? velocityX / speed : 0;
      const normalizedVy = speed > 0 ? velocityY / speed : 0;
      const particleSpeed = 0.5 + Math.random() * 1.5; // Random speed
      
      // Final velocity with slight randomness
      const finalVx = normalizedVx * particleSpeed + (Math.random() - 0.5) * 0.5;
      const finalVy = normalizedVy * particleSpeed + (Math.random() - 0.5) * 0.5;
      
      setParticles(prev => [...prev, {
        id,
        x: x + offsetX,
        y: y + offsetY,
        velocityX: finalVx,
        velocityY: finalVy,
        size,
        opacity: 0.8,
        color,
        lifetime
      }]);
      
      // Remove the particle after its lifetime
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, lifetime);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.classList.contains('orbit-item');
        
      // Make sure we're always setting a boolean value
      setIsPointer(Boolean(isClickable));
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    // Animation frame for particle updates
    let animationFrameId: number;
    
    const updateParticles = () => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          // Adjust fade rate based on page - faster fade for shorter lifetime on non-homepage
          opacity: p.opacity * (isHomePage ? 0.99 : 0.9),
          // Adjust shrink rate based on page - faster shrink for shorter lifetime on non-homepage
          size: p.size * (isHomePage ? 0.995 : 0.95),
          // Update position based on velocity
          x: p.x + p.velocityX,
          y: p.y + p.velocityY
        }))
      );
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    
    animationFrameId = requestAnimationFrame(updateParticles);

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-none');
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHomePage, isPointer]);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <div 
        ref={cursorRingRef} 
        className={`custom-cursor-ring ${isPointer ? 'custom-cursor-ring-pointer' : ''}`}
      >
        {orbitDots.map(dot => (
          <div
            key={dot.id}
            className="cursor-orbit-dot"
            style={{
              transform: `rotate(${dot.angle}deg) translateX(14px)`,
              opacity: isPointer ? '0.9' : '0.6',
              transition: 'opacity 0.3s ease',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default CustomCursor;
