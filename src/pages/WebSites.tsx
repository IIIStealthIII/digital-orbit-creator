
import React, { useEffect } from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const WebSites = () => {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">Web Sites</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            A collection of web design and development projects for various clients and purposes.
          </p>
        </div>
        
        <ProjectSection
          title="E-Commerce Platforms"
          description="Fully-featured online stores built with modern technologies like React, Next.js, and headless CMS solutions. These sites feature responsive designs, custom shopping carts, and integration with various payment processors."
        />
        
        <ProjectSection
          title="Portfolio Sites"
          description="Custom portfolio websites designed for artists, photographers, and creative professionals. These sites showcase client work with thoughtful layouts that highlight the unique qualities of each project."
        />
        
        <ProjectSection
          title="Interactive Web Experiences"
          description="Engaging web applications that push the boundaries of what's possible in a browser. These projects utilize advanced JavaScript, WebGL, and other modern web technologies to create immersive experiences."
        />
      </div>
    </div>
  );
};

export default WebSites;
