
import React, { useEffect } from 'react';
import OrbitSystem from '@/components/OrbitSystem';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  // Disable scrolling on the index (splash) page
  useEffect(() => {
    // Save original overflow value
    const originalOverflow = document.body.style.overflow;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Restore original overflow on unmount
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <CustomCursor />
      <div className="relative w-full h-full">
        <OrbitSystem />
      </div>
    </div>
  );
};

export default Index;
