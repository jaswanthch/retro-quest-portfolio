import React, { useState, useEffect } from 'react';
import SkillToken from './SkillToken';
import { Code, Database, Globe, Server, Terminal, Zap, Layout, FileCode, Gamepad } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const SkillsSection: React.FC = () => {
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  
  useEffect(() => {
    // Load collected skills from localStorage
    const savedSkills = JSON.parse(localStorage.getItem('collectedSkills') || '[]');
    setCollectedSkills(savedSkills);
  }, []);
  
  const skills = [
    { 
      name: 'JavaScript',
      icon: <Code className="text-white" size={18} />,
      description: 'A programming language for the web. Used for creating interactive elements on websites.',
      x: 20,
      y: 30,
      color: 'rgba(247, 223, 30, 0.8)'
    },
    { 
      name: 'React',
      icon: <Zap className="text-white" size={18} />,
      description: 'A JavaScript library for building user interfaces with component-based architecture.',
      x: 40,
      y: 50,
      color: 'rgba(97, 218, 251, 0.8)'
    },
    { 
      name: 'TypeScript',
      icon: <Terminal className="text-white" size={18} />,
      description: 'JavaScript with syntax for types, enhancing code quality and developer experience.',
      x: 70,
      y: 20,
      color: 'rgba(49, 120, 198, 0.8)'
    },
    { 
      name: 'Vite',
      icon: <Zap className="text-white" size={18} />,
      description: 'Next Generation Frontend Tooling with fast dev server and optimized builds.',
      x: 85,
      y: 60,
      color: 'rgba(121, 87, 247, 0.8)'
    },
    { 
      name: 'Tailwind CSS',
      icon: <Layout className="text-white" size={18} />,
      description: 'A utility-first CSS framework for rapid UI development with responsive design.',
      x: 15,
      y: 70,
      color: 'rgba(56, 189, 248, 0.8)'
    },
    { 
      name: 'Next.js',
      icon: <Globe className="text-white" size={18} />,
      description: 'The React Framework for Production with SSR, SSG, and ISR capabilities.',
      x: 60,
      y: 80,
      color: 'rgba(0, 0, 0, 0.8)'
    },
    { 
      name: 'MongoDB',
      icon: <Database className="text-white" size={18} />,
      description: 'The application data platform for modern applications with flexible schema design.',
      x: 30,
      y: 45,
      color: 'rgba(76, 175, 80, 0.8)'
    },
    { 
      name: 'WordPress',
      icon: <Globe className="text-white" size={18} />,
      description: 'The world\'s most popular CMS for building websites and blogs.',
      x: 75,
      y: 30,
      color: 'rgba(33, 117, 155, 0.8)'
    },
    { 
      name: 'PHP',
      icon: <FileCode className="text-white" size={18} />,
      description: 'Hypertext Preprocessor for server-side scripting and web development.',
      x: 45,
      y: 70,
      color: 'rgba(119, 123, 179, 0.8)'
    },
    { 
      name: 'MySQL',
      icon: <Server className="text-white" size={18} />,
      description: 'The world\'s most popular open source relational database.',
      x: 55,
      y: 25,
      color: 'rgba(0, 117, 143, 0.8)'
    }
  ];

  const handleSkillSelect = (skill: any) => {
    setSelectedSkill(skill);
  };

  const navigateToGame = () => {
    // Using the parent component's onControlClick handler defined in Index.tsx
    if (window.location.pathname === '/') {
      const event = new CustomEvent('navigateToSection', { 
        detail: { section: 'game' } 
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple min-h-[400px] relative">
      <h2 className="text-xl text-white mb-4 font-pixel">SKILL TOKENS</h2>
      
      <div className="flex flex-wrap justify-between items-start gap-6 mb-6">
        <p className="text-gray-300 max-w-lg">
          Explore my skill set! Each token represents a technology I've mastered. 
          Play the Snake Game to collect these skills and track your progress.
        </p>
        
        <div className="bg-arcade-dark p-3 rounded-lg border border-arcade-purple">
          <span className="text-arcade-green font-pixel">
            Collected: {collectedSkills.length}/{skills.length} skills
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {skills.map((skill) => (
          <Sheet key={skill.name}>
            <SheetTrigger asChild>
              <div 
                className={`bg-arcade-dark p-3 rounded-lg border ${collectedSkills.includes(skill.name) ? 'border-arcade-green' : 'border-arcade-purple'} cursor-pointer hover:border-arcade-green transition-colors flex items-center gap-2`}
                onClick={() => handleSkillSelect(skill)}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center" 
                  style={{ background: skill.color || 'rgba(155, 135, 245, 0.8)' }}
                >
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-pixel text-sm">{skill.name}</h3>
                  {collectedSkills.includes(skill.name) ? (
                    <span className="text-arcade-green text-xs">Collected</span>
                  ) : (
                    <span className="text-gray-400 text-xs">Not collected</span>
                  )}
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className="bg-arcade-darker border-l-2 border-arcade-purple">
              <SheetHeader>
                <SheetTitle className="text-arcade-green font-pixel text-xl">
                  {skill.name}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ background: skill.color || 'rgba(155, 135, 245, 0.8)' }}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="text-white font-pixel text-lg">{skill.name}</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  {skill.description}
                </p>
                {collectedSkills.includes(skill.name) ? (
                  <div className="bg-arcade-dark p-3 rounded-lg border border-arcade-green">
                    <p className="text-arcade-green font-pixel text-sm">Skill Collected!</p>
                  </div>
                ) : (
                  <div className="bg-arcade-dark p-3 rounded-lg border border-arcade-purple">
                    <p className="text-arcade-orange font-pixel text-sm">Not collected yet</p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
      
      <div className="flex justify-center mb-6">
        <Button
          onClick={navigateToGame} 
          className="bg-arcade-orange hover:bg-arcade-orange/80 text-white font-pixel flex items-center gap-2"
        >
          <Gamepad size={18} />
          PLAY SNAKE GAME TO COLLECT SKILLS
        </Button>
      </div>
      
      <div className="min-h-[100px] md:min-h-[200px] relative overflow-hidden bg-arcade-dark rounded-lg border-2 border-arcade-purple mb-4">
        <div className="absolute inset-0">
          {skills.map((skill) => (
            <SkillToken
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              description={skill.description}
              x={skill.x}
              y={skill.y}
              color={skill.color}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-center text-center">
        <p className="text-gray-300 max-w-lg text-sm">
          Click on the tokens in the section above to mark them as collected manually, 
          or play Snake Game to collect them automatically.
        </p>
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
