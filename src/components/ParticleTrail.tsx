
import React, { useRef, useEffect } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface ParticleTrailProps {
  mousePosition: { x: number, y: number };
  isMoving: boolean;
  isInWindow: boolean;
}

const ParticleTrail: React.FC<ParticleTrailProps> = ({ mousePosition, isMoving, isInWindow }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const requestRef = useRef<number>();

  // Add current position to trail
  useEffect(() => {
    if (isMoving && isInWindow) {
      trailPointsRef.current.push({
        x: mousePosition.x,
        y: mousePosition.y,
        timestamp: Date.now()
      });
      
      // Limit trail length
      if (trailPointsRef.current.length > 50) {
        trailPointsRef.current.shift();
      }
    }
  }, [mousePosition, isMoving, isInWindow]);

  // Draw trail
  useEffect(() => {
    const renderTrail = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas size to match window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (trailPointsRef.current.length < 2) {
        requestRef.current = requestAnimationFrame(renderTrail);
        return;
      }
      
      // Draw trail
      const now = Date.now();
      const maxAge = 500; // ms
      
      // Begin path for the trail
      ctx.beginPath();
      
      // Use the oldest point as starting point
      let hasDrawnAny = false;
      
      // Draw line segments connecting points
      for (let i = 0; i < trailPointsRef.current.length; i++) {
        const point = trailPointsRef.current[i];
        const age = now - point.timestamp;
        
        if (age > maxAge) {
          continue; // Skip points that are too old
        }
        
        // Calculate opacity based on age (newer = more opaque)
        const opacity = 1 - age / maxAge;
        
        if (!hasDrawnAny) {
          ctx.moveTo(point.x, point.y);
          hasDrawnAny = true;
          continue;
        }
        
        ctx.lineTo(point.x, point.y);
        
        // Set line style
        ctx.strokeStyle = `rgba(16, 249, 241, ${opacity})`;
        ctx.lineWidth = 2 + (1 - age / maxAge) * 2; // Thicker for newer segments
      }
      
      // Stroke the path
      ctx.stroke();
      
      // Clean up old points
      trailPointsRef.current = trailPointsRef.current.filter(
        point => now - point.timestamp <= maxAge
      );
      
      requestRef.current = requestAnimationFrame(renderTrail);
    };
    
    requestRef.current = requestAnimationFrame(renderTrail);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-40"
    />
  );
};

export default ParticleTrail;
