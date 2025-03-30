
import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import LightningParticles from '@/components/LightningParticles';
import ParticleTrail from '@/components/ParticleTrail';

interface CursorEffectProps {
  targetSelector?: string;
}

const CursorEffect: React.FC<CursorEffectProps> = ({ targetSelector }) => {
  const { mousePosition, isMoving, isInWindow } = useMousePosition();
  const targetsRef = useRef<Element[]>([]);

  // Find targets that match the selector
  useEffect(() => {
    if (targetSelector) {
      targetsRef.current = Array.from(document.querySelectorAll(targetSelector));
    }
  }, [targetSelector]);

  return (
    <>
      <ParticleTrail 
        mousePosition={mousePosition}
        isMoving={isMoving}
        isInWindow={isInWindow}
      />
      <LightningParticles 
        mousePosition={mousePosition}
        targets={targetsRef.current}
        isInWindow={isInWindow}
      />
    </>
  );
};

export default CursorEffect;
