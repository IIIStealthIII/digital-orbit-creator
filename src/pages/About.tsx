
import React from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const About = () => {
  return (
    <div className="min-h-screen w-full pt-20 px-4 md:px-8">
      <TronNavigation />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">About Me</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            Digital creator specializing in game development, application design, and interactive experiences.
          </p>
        </div>
        
        <ProjectSection
          title="Who I Am"
          description="I'm a developer and digital artist with a passion for creating immersive digital experiences. With expertise spanning multiple disciplines, I blend technical precision with creative vision to build games, applications, and interactive digital art.

My journey began with a fascination for how technology can create new forms of expression and interaction. This led me to explore various programming languages, 3D modeling techniques, and electronic prototyping - all with the goal of bringing innovative ideas to life.

When I'm not coding or designing, I'm continuously learning about emerging technologies and finding new ways to push creative boundaries."
        />
        
        <ProjectSection
          title="My Skills"
          description="• Full-stack development with expertise in React, TypeScript, and Node.js
• Game development using Unity and Unreal Engine
• 3D modeling and animation with Blender and Maya
• Electronics prototyping with Arduino and Raspberry Pi
• UI/UX design focused on creating intuitive, engaging experiences
• Strong problem-solving abilities and attention to detail"
        />
        
        <ProjectSection
          title="My Approach"
          description="I believe in creating digital experiences that are not just functional, but emotionally resonant and visually striking. Every project I undertake is guided by three core principles:

Innovation: Pushing boundaries and exploring new possibilities rather than following established patterns.

Quality: Maintaining high standards in both the technical implementation and visual presentation.

User Experience: Keeping the end user's needs and experience at the center of every design decision.

I approach each new challenge with enthusiasm and a determination to create something extraordinary."
        />
      </div>
    </div>
  );
};

export default About;
