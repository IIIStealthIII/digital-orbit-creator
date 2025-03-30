
import React, { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { SmokeParticle, createSmokeParticle, updateSmokeParticle, isParticleDead } from '@/utils/smokeEffect';

const CursorEffect: React.FC = () => {
  const { mousePosition, isInWindow } = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastEmitTimeRef = useRef<number>(0);
  
  // Clean up particles and animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial resize
    resizeCanvas();
    
    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current = particlesRef.current
        .map(updateSmokeParticle)
        .filter(p => !isParticleDead(p));
      
      // Emit new particles if mouse is in window
      if (isInWindow) {
        const now = Date.now();
        // Emit particles every 10ms while mouse is in window
        if (now - lastEmitTimeRef.current > 10) {
          // Create 2-3 particles at current mouse position
          const count = Math.floor(Math.random() * 2) + 2;
          for (let i = 0; i < count; i++) {
            particlesRef.current.push(
              createSmokeParticle(mousePosition.x, mousePosition.y)
            );
          }
          lastEmitTimeRef.current = now;
        }
      }
      
      // Draw all particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Set gradient for particle
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        
        // Extract base color from rgba string
        const baseColor = particle.color.slice(0, -4); // Remove the alpha part
        
        gradient.addColorStop(0, `${baseColor}${particle.alpha})`);
        gradient.addColorStop(1, `${baseColor}0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Continue animation
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition, isInWindow]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-40"
      aria-hidden="true"
    />
  );
};

export default CursorEffect;
