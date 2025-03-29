
import React from 'react';

interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

interface ProjectProps {
  title: string;
  description: string;
  media?: ProjectMedia[];
}

const ProjectSection: React.FC<ProjectProps> = ({ title, description, media = [] }) => {
  return (
    <div className="mb-16 p-6 border border-tron-cyan border-opacity-30 rounded-lg backdrop-blur-sm bg-tron-blue bg-opacity-5 hover:bg-opacity-10 transition-all duration-500">
      <h2 className="text-2xl font-bold mb-4 glow-text">{title}</h2>
      
      <div className="text-left mb-6 text-tron-cyan text-opacity-90">
        {description.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3">{paragraph}</p>
        ))}
      </div>
      
      {media && media.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.caption || `${title} image ${index + 1}`} 
                  className="w-full h-auto rounded-md border border-tron-cyan border-opacity-40 hover:border-opacity-100 transition-all duration-300"
                />
              ) : (
                <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={item.url}
                    title={item.caption || `${title} video ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full rounded-md border border-tron-cyan border-opacity-40"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {item.caption && (
                <p className="mt-2 text-sm text-tron-cyan text-opacity-70">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
