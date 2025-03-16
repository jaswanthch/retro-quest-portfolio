
import React, { useState } from 'react';
import { useArcadeSound } from './AudioController';
import { toast } from '@/components/ui/use-toast';

interface SkillTokenProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  x: number;
  y: number;
}

const SkillToken: React.FC<SkillTokenProps> = ({ name, icon, description, x, y }) => {
  const [collected, setCollected] = useState(false);
  const { playSound } = useArcadeSound();
  
  const handleCollect = () => {
    if (!collected) {
      playSound('collect');
      setCollected(true);
      
      toast({
        title: `Skill Collected: ${name}`,
        description: description,
        duration: 5000,
      });
      
      // Save to localStorage to persist between sessions
      const collectedSkills = JSON.parse(localStorage.getItem('collectedSkills') || '[]');
      localStorage.setItem('collectedSkills', JSON.stringify([...collectedSkills, name]));
    }
  };

  return (
    <div 
      className={`skill-token absolute ${collected ? 'opacity-50' : ''}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={handleCollect}
    >
      {icon}
      <span className="sr-only">{name}</span>
    </div>
  );
};

export default SkillToken;
