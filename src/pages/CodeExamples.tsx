
import React from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const CodeExamples = () => {
  return (
    <div className="min-h-screen w-full pt-20 px-4 md:px-8">
      <TronNavigation />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">Code Examples</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            Demonstrations of programming techniques and solutions.
          </p>
        </div>
        
        <ProjectSection
          title="Particle System Optimization"
          description="A demonstration of optimized particle systems for web applications. This code example showcases techniques for rendering thousands of particles with minimal performance impact by using WebGL and shader-based rendering.

The implementation includes spatial partitioning for collision detection and custom memory management to reduce garbage collection pauses."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1585149869863-2c06267e244e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80', 
              caption: 'Particle system rendering 50,000 elements in real-time' 
            }
          ]}
        />
        
        <ProjectSection
          title="Neural Network Visualizer"
          description="A interactive tool for visualizing how neural networks process information. Users can adjust network architecture, observe weight changes during training, and see activations in real-time.

Built with TypeScript and D3.js, this tool helps demystify deep learning by providing intuitive visualizations of complex mathematical processes."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80', 
              caption: 'Neural network architecture visualization' 
            },
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1677442135136-760c813dfc5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80', 
              caption: 'Training visualization showing weight adjustments' 
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CodeExamples;
