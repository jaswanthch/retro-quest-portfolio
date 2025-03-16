
import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useArcadeSound } from './AudioController';
import ArcadeButton from './ArcadeButton';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageUrl,
  liveUrl,
  repoUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playSound } = useArcadeSound();
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg pixel-corners border-2 border-arcade-purple bg-arcade-darker h-64 transition-all duration-300 hover:scale-105"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-arcade-darker bg-opacity-70 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      
      <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
        <div>
          <h3 className="text-md font-pixel text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-3 line-clamp-3">{description}</p>
        </div>
        
        <div>
          <div className="flex flex-wrap gap-1 mb-3">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-arcade-purple bg-opacity-50 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            {liveUrl && (
              <ArcadeButton 
                color="blue" 
                className="py-1 px-2 text-xs"
                onClick={() => window.open(liveUrl, '_blank')}
              >
                <ExternalLink size={14} className="mr-1" /> Live
              </ArcadeButton>
            )}
            
            {repoUrl && (
              <ArcadeButton 
                color="purple" 
                className="py-1 px-2 text-xs"
                onClick={() => window.open(repoUrl, '_blank')}
              >
                <Github size={14} className="mr-1" /> Repo
              </ArcadeButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
