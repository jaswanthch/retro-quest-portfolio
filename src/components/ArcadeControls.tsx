
import React from 'react';
import { UserRound, Code, Briefcase, Send, Power, Gamepad2 } from 'lucide-react';
import { useArcadeSound } from './AudioController';
import ArcadeButton from './ArcadeButton';

interface ArcadeControlsProps {
  onControlClick: (section: string) => void;
  activeSection: string;
}

const ArcadeControls: React.FC<ArcadeControlsProps> = ({ onControlClick, activeSection }) => {
  const { playSound } = useArcadeSound();

  const handleButtonClick = (section: string) => {
    playSound('click');
    onControlClick(section);
  };

  return (
    <div className="bg-arcade-darker rounded-lg p-4 border-2 border-arcade-purple">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col items-center">
          <ArcadeButton 
            color={activeSection === 'about' ? 'green' : 'purple'}
            onClick={() => handleButtonClick('about')}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <UserRound size={24} />
          </ArcadeButton>
          <span className="text-xs font-pixel text-gray-300">ABOUT</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ArcadeButton 
            color={activeSection === 'skills' ? 'green' : 'blue'}
            onClick={() => handleButtonClick('skills')}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <Code size={24} />
          </ArcadeButton>
          <span className="text-xs font-pixel text-gray-300">SKILLS</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ArcadeButton 
            color={activeSection === 'projects' ? 'green' : 'orange'}
            onClick={() => handleButtonClick('projects')}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <Briefcase size={24} />
          </ArcadeButton>
          <span className="text-xs font-pixel text-gray-300">PROJECTS</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ArcadeButton 
            color={activeSection === 'contact' ? 'green' : 'pink'}
            onClick={() => handleButtonClick('contact')}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <Send size={24} />
          </ArcadeButton>
          <span className="text-xs font-pixel text-gray-300">CONTACT</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ArcadeButton 
            color={activeSection === 'game' ? 'green' : 'orange'}
            onClick={() => handleButtonClick('game')}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <Gamepad2 size={24} />
          </ArcadeButton>
          <span className="text-xs font-pixel text-gray-300">SNAKE GAME</span>
        </div>
        
        <div className="flex flex-col items-center">
          <ArcadeButton 
            color="pink"
            onClick={() => handleButtonClick('start')}
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          >
            <Power size={24} />
          </ArcadeButton>
          <span className="text-xs font-pixel text-gray-300">RESET</span>
        </div>
      </div>
    </div>
  );
};

export default ArcadeControls;
