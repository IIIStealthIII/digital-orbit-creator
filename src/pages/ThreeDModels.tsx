
import React, { useEffect } from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const ThreeDModels = () => {
  // Enable scrolling on content pages
  useEffect(() => {
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';
    
    // No cleanup needed as other pages will set their own overflow
  }, []);

  return (
    <div className="min-h-screen w-full pt-20 px-4 md:px-8">
      <TronNavigation />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">3D Models</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            A collection of 3D models designed for various applications including games, visualization, and art.
          </p>
        </div>
        
        <ProjectSection
          title="Character Models"
          description="A series of character models designed for games and animation projects. These models include fully rigged characters with textures and materials optimized for real-time applications."
        />
        
        <ProjectSection
          title="Environmental Assets"
          description="Detailed environment models including buildings, vegetation, and terrain elements. These assets are designed with modularity in mind, allowing for flexible scene composition."
        />
        
        <ProjectSection
          title="Product Visualization"
          description="High-fidelity 3D models created for product visualization and marketing. These models feature photorealistic materials and lighting to showcase products in their best light."
        />
      </div>
    </div>
  );
};

export default ThreeDModels;
