
import React from 'react';
import { useArcadeSound } from './AudioController';

interface ArcadeControlsProps {
  onControlClick: (control: string) => void;
  activeSection: string;
}

const ArcadeControls: React.FC<ArcadeControlsProps> = ({ 
  onControlClick, 
  activeSection 
}) => {
  const { playSound } = useArcadeSound();
  
  const handleClick = (section: string) => {
    playSound('click');
    onControlClick(section);
  };

  return (
    <div className="w-full bg-arcade-darker p-4 rounded-lg pixel-corners border-2 border-arcade-purple">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-arcade-darker border-4 border-arcade-blue"></div>
            <button
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-md bg-arcade-blue ${
                activeSection === 'about' ? 'bg-opacity-100' : 'bg-opacity-70 hover:bg-opacity-100'
              } transition-all`}
              onClick={() => handleClick('about')}
              aria-label="About"
            ></button>
            <button
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-md bg-arcade-blue ${
                activeSection === 'projects' ? 'bg-opacity-100' : 'bg-opacity-70 hover:bg-opacity-100'
              } transition-all`}
              onClick={() => handleClick('projects')}
              aria-label="Projects"
            ></button>
            <button
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-arcade-blue ${
                activeSection === 'skills' ? 'bg-opacity-100' : 'bg-opacity-70 hover:bg-opacity-100'
              } transition-all`}
              onClick={() => handleClick('skills')}
              aria-label="Skills"
            ></button>
            <button
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-arcade-blue ${
                activeSection === 'contact' ? 'bg-opacity-100' : 'bg-opacity-70 hover:bg-opacity-100'
              } transition-all`}
              onClick={() => handleClick('contact')}
              aria-label="Contact"
            ></button>
          </div>
          <p className="text-xs text-gray-400 mt-2 font-pixel">JOYSTICK</p>
        </div>
        
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full bg-arcade-orange ${
                activeSection === 'about' ? 'animate-pulse-glow' : ''
              } hover:animate-pulse-glow transition-all`}
              onClick={() => handleClick('about')}
            >
              <span className="font-pixel text-white">A</span>
            </button>
            <p className="text-xs text-gray-400 mt-1">ABOUT</p>
          </div>
          
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full bg-arcade-green ${
                activeSection === 'skills' ? 'animate-pulse-glow' : ''
              } hover:animate-pulse-glow transition-all`}
              onClick={() => handleClick('skills')}
            >
              <span className="font-pixel text-white">B</span>
            </button>
            <p className="text-xs text-gray-400 mt-1">SKILLS</p>
          </div>
          
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full bg-arcade-purple ${
                activeSection === 'projects' ? 'animate-pulse-glow' : ''
              } hover:animate-pulse-glow transition-all`}
              onClick={() => handleClick('projects')}
            >
              <span className="font-pixel text-white">X</span>
            </button>
            <p className="text-xs text-gray-400 mt-1">PROJECTS</p>
          </div>
          
          <div className="flex flex-col items-center">
            <button
              className={`w-12 h-12 rounded-full bg-arcade-blue ${
                activeSection === 'contact' ? 'animate-pulse-glow' : ''
              } hover:animate-pulse-glow transition-all`}
              onClick={() => handleClick('contact')}
            >
              <span className="font-pixel text-white">Y</span>
            </button>
            <p className="text-xs text-gray-400 mt-1">CONTACT</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <button
            className="w-24 h-10 bg-arcade-pink rounded-lg font-pixel text-white text-sm"
            onClick={() => handleClick('start')}
          >
            START
          </button>
          <p className="text-xs text-gray-400 mt-1">RESET</p>
        </div>
      </div>
    </div>
  );
};

export default ArcadeControls;
