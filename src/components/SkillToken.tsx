
import React, { useState, useEffect } from 'react';
import { useArcadeSound } from './AudioController';
import { toast } from '@/components/ui/use-toast';

interface SkillTokenProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  x: number;
  y: number;
  color?: string;
}

const SkillToken: React.FC<SkillTokenProps> = ({ name, icon, description, x, y, color }) => {
  const [collected, setCollected] = useState(false);
  const { playSound } = useArcadeSound();
  
  useEffect(() => {
    // Check if this skill has been collected before
    const collectedSkills = JSON.parse(localStorage.getItem('collectedSkills') || '[]');
    if (collectedSkills.includes(name)) {
      setCollected(true);
    }
  }, [name]);
  
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
      className={`skill-token absolute ${collected ? 'opacity-50' : 'animate-pulse'} transition-all duration-300 hover:scale-110`}
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        background: collected ? 'rgba(155, 135, 245, 0.3)' : (color || 'rgba(155, 135, 245, 0.8)'),
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: collected ? 'none' : `0 0 8px ${color || 'rgba(155, 135, 245, 0.8)'}`,
      }}
      onClick={handleCollect}
    >
      <span className="sr-only">{name}</span>
      {icon}
    </div>
  );
};

export default SkillToken;
