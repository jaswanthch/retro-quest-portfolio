
import React, { useState, useEffect } from 'react';
import SkillToken from './SkillToken';
import { Code, Database, Globe, Palette, Server, Terminal } from 'lucide-react';

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
      description: 'Advanced JavaScript including ES6+ features, async/await, and functional programming.',
      x: 20,
      y: 30
    },
    { 
      name: 'React',
      icon: <Palette className="text-white" size={18} />,
      description: 'Building interactive UIs with React, Redux, and React Router.',
      x: 40,
      y: 50
    },
    { 
      name: 'Node.js',
      icon: <Server className="text-white" size={18} />,
      description: 'Server-side JavaScript with Express, RESTful APIs, and authentication.',
      x: 70,
      y: 20
    },
    { 
      name: 'TypeScript',
      icon: <Terminal className="text-white" size={18} />,
      description: 'Type-safe code with interfaces, generics, and advanced type features.',
      x: 85,
      y: 60
    },
    { 
      name: 'MongoDB',
      icon: <Database className="text-white" size={18} />,
      description: 'NoSQL database design, queries, and integration with Node.js applications.',
      x: 15,
      y: 70
    },
    { 
      name: 'Responsive Design',
      icon: <Globe className="text-white" size={18} />,
      description: 'Creating fluid layouts with CSS Grid, Flexbox, and media queries.',
      x: 60,
      y: 80
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
            ACHIEVEMENT UNLOCKED: SKILL MASTER
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;
