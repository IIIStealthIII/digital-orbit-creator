
import React, { useEffect } from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const OtherProjects = () => {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">Other Projects</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            A collection of unique projects that don't fit neatly into other categories.
          </p>
        </div>
        
        <ProjectSection
          title="Custom Furniture Design"
          description="Handcrafted wooden furniture designs with integrated technology features. These pieces combine traditional woodworking techniques with modern elements like wireless charging, LED lighting, and hidden compartments."
        />
        
        <ProjectSection
          title="Interactive Art Installations"
          description="Mixed-media art installations featuring interactive elements powered by sensors and microcontrollers. These projects blend physical craftsmanship with digital interactivity to create unique experiences."
        />
        
        <ProjectSection
          title="Craftsman Projects"
          description="Various craftsman projects including custom leather goods, metal casting experiments, and textile designs. These projects showcase a range of traditional crafting techniques applied to modern designs."
        />
      </div>
    </div>
  );
};

export default OtherProjects;
