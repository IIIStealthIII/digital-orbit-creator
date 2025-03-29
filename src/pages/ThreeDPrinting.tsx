
import React from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const ThreeDPrinting = () => {
  return (
    <div className="min-h-screen w-full pt-20 px-4 md:px-8">
      <TronNavigation />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">3D Printing</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            Physical creations brought to life through additive manufacturing.
          </p>
        </div>
        
        <ProjectSection
          title="Geometric Lamp Series"
          description="A collection of 3D printed lamps with intricate geometric patterns that cast complex shadows. Each lamp is designed to disassemble for easy printing and features an internal mount for LED lighting.

Printed using translucent PLA with varying densities to control light diffusion through different sections of the design."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1565775177580-0e681b928cfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80', 
              caption: 'Icosahedron lamp with gradient light diffusion' 
            },
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1629076832998-9310d98ed5e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80', 
              caption: 'Shadow patterns cast by the cubic lattice design' 
            }
          ]}
        />
        
        <ProjectSection
          title="Modular Robotics Kit"
          description="A set of 3D printable components for building custom robots. The kit includes structural elements, gear systems, motor mounts, and sensor housings that can be assembled without additional hardware.

Designed with educational purposes in mind, allowing students to learn about mechanics, electronics, and programming through hands-on construction."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1597354984706-fac992d9306f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80', 
              caption: 'Assembled robot using the modular components' 
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ThreeDPrinting;
