
import React, { useEffect } from 'react';
import OrbitSystem from '@/components/OrbitSystem';
import CursorEffect from '@/components/CursorEffect';

const Index = () => {
  // Disable scrolling on the index (splash) page
  useEffect(() => {
    // Save original overflow value
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    
    // Disable scrolling and set 100% height
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    
    // Restore original overflow on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <CursorEffect targetSelector=".tron-button" />
      <div className="relative w-full h-full">
        <OrbitSystem />
      </div>
    </div>
  );
};

export default Index;
