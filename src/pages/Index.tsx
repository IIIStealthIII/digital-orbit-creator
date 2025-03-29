
import React from 'react';
import OrbitSystem from '@/components/OrbitSystem';
import CursorEffect from '@/components/CursorEffect';

const Index = () => {
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
