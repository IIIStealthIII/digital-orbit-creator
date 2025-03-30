
import React, { useEffect } from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const Electronics = () => {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">Electronics Projects</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            Custom electronics projects from simple circuits to complex microcontroller applications.
          </p>
        </div>
        
        <ProjectSection
          title="Arduino-Based Home Automation"
          description="A DIY home automation system built with Arduino microcontrollers. This project includes custom PCB designs, sensors for monitoring environmental conditions, and a central control system accessible via mobile app."
        />
        
        <ProjectSection
          title="Raspberry Pi Media Center"
          description="A custom media center built with a Raspberry Pi, featuring a laser-cut acrylic case with integrated cooling, custom interface, and automated content management system."
        />
        
        <ProjectSection
          title="DIY Synthesizer"
          description="An analog synthesizer built from scratch, featuring voltage-controlled oscillators, filters, and amplifiers. This project includes custom PCB design, panel layout, and enclosure fabrication."
        />
      </div>
    </div>
  );
};

export default Electronics;
