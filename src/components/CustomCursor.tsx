
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!cursor || !cursorRing) return;

    // Add custom cursor styles to the body
    document.body.classList.add('cursor-none');
    
    const moveCursor = (e: MouseEvent) => {
      // Position the main cursor dot at mouse position
      const { clientX, clientY } = e;
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      
      // Position the ring with slight delay for trailing effect
      setTimeout(() => {
        cursorRing.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }, 100);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('orbit-item');
        
      setIsPointer(isClickable);
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isPointer ? 'custom-cursor-pointer' : ''}`}
      />
      <div 
        ref={cursorRingRef} 
        className={`custom-cursor-ring ${isPointer ? 'custom-cursor-ring-pointer' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
