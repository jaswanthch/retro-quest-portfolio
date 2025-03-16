
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ArcadeButton from './ArcadeButton';

const ProjectsSection: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  
  const projects = [
    // Level 1 Projects
    [
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured online store with product catalog, shopping cart, and secure checkout.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: '#',
        repoUrl: '#'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task tracker with real-time updates, assignments, and progress monitoring.',
        technologies: ['React', 'Firebase', 'Tailwind CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        liveUrl: '#',
        repoUrl: '#'
      },
    ],
    // Level 2 Projects
    [
      {
        title: 'Weather Dashboard',
        description: 'Interactive weather application with forecast data, location search, and saved locations.',
        technologies: ['JavaScript', 'Weather API', 'Chart.js'],
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: '#',
        repoUrl: '#'
      },
      {
        title: 'Recipe Finder',
        description: 'Search and save recipes by ingredients, dietary restrictions, and cuisine preferences.',
        technologies: ['React', 'Redux', 'Food API'],
        imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80',
        liveUrl: '#',
        repoUrl: '#'
      },
    ],
    // Level 3 Projects
    [
      {
        title: 'Social Media Dashboard',
        description: 'Analytics platform for tracking engagement across multiple social media platforms.',
        technologies: ['TypeScript', 'React', 'D3.js'],
        imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
        liveUrl: '#',
        repoUrl: '#'
      },
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing projects with an arcade game aesthetic.',
        technologies: ['React', 'Tailwind CSS', 'Three.js'],
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: '#',
        repoUrl: '#'
      },
    ]
  ];

  return (
    <div className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl text-white font-pixel">PROJECT MISSIONS</h2>
        <div className="flex items-center gap-2 text-sm text-arcade-green font-pixel">
          LEVEL {currentLevel}/3
        </div>
      </div>
      
      <div className="flex mb-4 gap-3">
        {[1, 2, 3].map(level => (
          <ArcadeButton
            key={level}
            color={level === currentLevel ? 'green' : 'blue'}
            className="flex-1 py-2"
            onClick={() => setCurrentLevel(level)}
          >
            Level {level}
          </ArcadeButton>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {projects[currentLevel - 1].map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
