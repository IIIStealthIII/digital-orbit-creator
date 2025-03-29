
import React from 'react';
import TronNavigation from '@/components/TronNavigation';
import ProjectSection from '@/components/ProjectSection';

const Games = () => {
  return (
    <div className="min-h-screen w-full pt-20 px-4 md:px-8">
      <TronNavigation />
      
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 glow-text">Games</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-tron-cyan text-opacity-80">
            A collection of interactive gaming experiences I've designed and developed.
          </p>
        </div>
        
        <ProjectSection
          title="Neon Horizon"
          description="A fast-paced racing game set in a futuristic cyberpunk world. Players navigate through neon-lit cityscapes while avoiding obstacles and competing against AI opponents.

Developed using Unreal Engine with custom shaders for the distinct visual style. The game features a dynamic soundtrack that adapts to the player's performance and race progression."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 
              caption: 'Neon Horizon gameplay screenshot showing the main racing circuit' 
            },
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1633957897986-70e83293f3ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80', 
              caption: 'Vehicle customization interface' 
            }
          ]}
        />
        
        <ProjectSection
          title="Quantum Maze"
          description="A puzzle game that challenges players to manipulate quantum mechanics to solve increasingly complex mazes. Players can create superpositions of objects, utilize quantum tunneling, and exploit entanglement to progress.

Built with Unity and featuring custom physics simulations to create the quantum effects. The game includes over 50 levels of increasing difficulty."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', 
              caption: 'Quantum Maze level design showing entanglement puzzles' 
            }
          ]}
        />
        
        <ProjectSection
          title="Digital Orbit"
          description="An immersive VR experience where players explore a digital universe by manipulating data streams and constructing new virtual environments. The game combines elements of creation, exploration, and puzzle-solving.

Developed for major VR platforms using custom rendering techniques to maximize performance while maintaining visual fidelity."
          media={[
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1605979399824-ea3f7c3d290a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80', 
              caption: 'Player interacting with a data stream in VR' 
            },
            { 
              type: 'image', 
              url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80', 
              caption: 'Digital environment construction interface' 
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Games;
