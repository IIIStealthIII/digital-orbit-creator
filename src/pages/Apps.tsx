
import React from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const Apps = () => {
  return (
    <div className="min-h-screen w-full pt-20 px-4 md:px-8">
      <TronNavigation />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">Apps</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            Software applications designed to solve problems and enhance productivity.
          </p>
        </div>
        
        <ProjectSection
          title="Nebula Notes"
          description="A note-taking application with an astronomical theme. Nebula Notes organizes information in a spatial, galaxy-like interface where notes orbit central topics and can be arranged in constellations of related ideas.

Built with React and Canvas API to create fluid, interactive visualizations of note relationships. Features include cloud sync, collaboration tools, and AI-assisted organization."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1693514206397-6f94c911fba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80', 
              caption: 'Nebula Notes spatial interface showing related notes in orbit' 
            }
          ]}
        />
        
        <ProjectSection
          title="Quantum Timer"
          description="A productivity app that uses principles of quantum physics to help users manage time more effectively. The app uses an uncertainty-based timer system that adapts work and break periods based on user focus patterns.

Developed for iOS and Android using React Native with custom animations and a minimalist interface designed to minimize distractions."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1693514206397-6f94c911fba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80', 
              caption: 'Quantum Timer interface showing focus session in progress' 
            },
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', 
              caption: 'Analytics dashboard showing productivity patterns' 
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Apps;
