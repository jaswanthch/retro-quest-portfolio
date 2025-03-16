import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ArcadeButton from './ArcadeButton';

const ProjectsSection: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  
  const projects = [
    // Level 1 Projects
    [
      {
        title: 'Spotlight Search for WP',
        description: 'Allows instant access to WordPress dashboard content with ease—pages, posts, and templates at your fingertips.',
        technologies: ['WordPress', 'PHP', 'JavaScript'],
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: '#',
        repoUrl: 'https://github.com/jaswanthch/SpotlightSearchWP'
      },
      {
        title: 'Free Favicon Generator',
        description: 'Quickly generate favicons for your SaaS, completely free for life.',
        technologies: ['React', 'JavaScript', 'CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1545078165-9865d8be2512?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: 'https://favicongenerator.chjaswanth.com/',
      },
    ],
    // Level 2 Projects
    [
      {
        title: 'SEO Analyzer',
        description: 'Get a detailed analysis of your websites On-Page SEO & get AI powered suggestions to improve it.',
        technologies: ['Next.js', 'React', 'AI'],
        imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: 'https://seoanalyzer.chjaswanth.com/',
      },
      {
        title: 'Free Invoice Generator',
        description: 'Quickly generate Invoice for your client, completely free for life.',
        technologies: ['React', 'JavaScript', 'PDF Generation'],
        imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: 'https://invoicegenerator.chjaswanth.com/',
      },
    ],
    // Level 3 Projects
    [
      {
        title: 'Content Usher',
        description: 'Your content generation and marketing powered by AI (In Development).',
        technologies: ['Next.js', 'React', 'AI', 'TypeScript'],
        imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: 'https://contentusher.com',
      },
      {
        title: 'Arcade Portfolio',
        description: 'This interactive portfolio with arcade game aesthetics showcasing my full-stack development skills.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS'],
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        liveUrl: 'https://retro-quest-portfolio.lovable.app/',
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
