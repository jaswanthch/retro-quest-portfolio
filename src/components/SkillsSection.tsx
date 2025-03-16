
import React, { useState, useEffect } from 'react';
import SkillToken from './SkillToken';
import { Code, Database, Globe, Server, Terminal, Zap, Layout, FileCode } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  
  useEffect(() => {
    // Load collected skills from localStorage
    const savedSkills = JSON.parse(localStorage.getItem('collectedSkills') || '[]');
    setCollectedSkills(savedSkills);
  }, []);
  
  const skills = [
    { 
      name: 'JavaScript',
      icon: <Code className="text-white" size={18} />,
      description: 'JavaScript library for building dynamic user interfaces with modern ES6+ features.',
      x: 20,
      y: 30
    },
    { 
      name: 'React',
      icon: <Zap className="text-white" size={18} />,
      description: 'A JavaScript library for building user interfaces with component-based architecture.',
      x: 40,
      y: 50
    },
    { 
      name: 'TypeScript',
      icon: <Terminal className="text-white" size={18} />,
      description: 'JavaScript with syntax for types, enhancing code quality and developer experience.',
      x: 70,
      y: 20
    },
    { 
      name: 'Vite',
      icon: <Zap className="text-white" size={18} />,
      description: 'Next Generation Frontend Tooling with fast dev server and optimized builds.',
      x: 85,
      y: 60
    },
    { 
      name: 'Tailwind CSS',
      icon: <Layout className="text-white" size={18} />,
      description: 'A utility-first CSS framework for rapid UI development with responsive design.',
      x: 15,
      y: 70
    },
    { 
      name: 'Next.js',
      icon: <Globe className="text-white" size={18} />,
      description: 'The React Framework for Production with SSR, SSG, and ISR capabilities.',
      x: 60,
      y: 80
    },
    { 
      name: 'MongoDB',
      icon: <Database className="text-white" size={18} />,
      description: 'The application data platform for modern applications with flexible schema design.',
      x: 30,
      y: 45
    },
    { 
      name: 'WordPress',
      icon: <Globe className="text-white" size={18} />,
      description: 'The world\'s most popular CMS for building websites and blogs.',
      x: 75,
      y: 30
    },
    { 
      name: 'PHP',
      icon: <FileCode className="text-white" size={18} />,
      description: 'Hypertext Preprocessor for server-side scripting and web development.',
      x: 45,
      y: 70
    },
    { 
      name: 'MySQL',
      icon: <Server className="text-white" size={18} />,
      description: 'The world\'s most popular open source relational database.',
      x: 55,
      y: 25
    }
  ];

  return (
    <div className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple min-h-[400px] relative">
      <h2 className="text-xl text-white mb-4 font-pixel">SKILL TOKENS</h2>
      <p className="text-gray-300 mb-6">
        Click on the glowing tokens to collect and reveal detailed skills information.
        <span className="block mt-2 text-arcade-green">
          Collected: {collectedSkills.length}/{skills.length} skills
        </span>
      </p>
      
      <div className="min-h-[300px] relative">
        {skills.map((skill) => (
          <SkillToken
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            description={skill.description}
            x={skill.x}
            y={skill.y}
          />
        ))}
      </div>
      
      {collectedSkills.length === skills.length && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-arcade-green font-pixel animate-pulse">
            ACHIEVEMENT UNLOCKED: FULL STACK MASTER
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
