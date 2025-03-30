
import { useState, useEffect, useRef } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isInWindow, setIsInWindow] = useState(true);
  const lastMousePosition = useRef<MousePosition>({ x: 0, y: 0 });
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

    const handleMouseLeave = () => {
      setIsInWindow(false);
    };

    const handleMouseEnter = () => {
      setIsInWindow(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
      }
    };
  }, []);

  return { mousePosition, isMoving, isInWindow, lastMousePosition: lastMousePosition.current };
};
