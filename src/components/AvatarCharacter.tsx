
import React, { useState, useEffect } from 'react';
import { useArcadeSound } from './AudioController';

interface AvatarCharacterProps {
  onGuide: (section: string) => void;
}

const AvatarCharacter: React.FC<AvatarCharacterProps> = ({ onGuide }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialogText, setDialogText] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const { playSound } = useArcadeSound();
  
  // Sprite frame logic
  const [frame, setFrame] = useState(0);
  const frames = 2; // Number of animation frames
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % frames);
    }, 500);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const moveAvatar = (targetX: number, targetY: number) => {
    setIsAnimating(true);
    setPosition({ x: targetX, y: targetY });
    setTimeout(() => setIsAnimating(false), 1000);
  };
  
  const showGuideDialog = (text: string, section: string) => {
    setDialogText(text);
    setShowDialog(true);
    playSound('click');
    
    setTimeout(() => {
      setShowDialog(false);
      onGuide(section);
    }, 3000);
  };
  
  const handleClick = () => {
    const dialogOptions = [
      { text: "Hi there! I'm your guide. Click on a section to explore!", section: "" },
      { text: "Want to see my skills? Let's go there!", section: "skills" },
      { text: "Check out my awesome projects!", section: "projects" },
      { text: "Need to get in touch? Let's go to contact!", section: "contact" }
    ];
    
    const randomOption = dialogOptions[Math.floor(Math.random() * dialogOptions.length)];
    showGuideDialog(randomOption.text, randomOption.section);
  };

  return (
    <div 
      className={`absolute transition-all duration-1000 ${isAnimating ? 'animate-float' : ''}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 10
      }}
    >
      <div 
        className="w-16 h-16 relative cursor-pointer"
        onClick={handleClick}
      >
        {showDialog && (
          <div className="absolute top-0 left-full ml-4 w-48 p-3 bg-white text-black rounded font-pixel text-xs animate-fade-in">
            <div className="absolute left-0 top-1/2 -ml-2 w-0 h-0 border-t-4 border-r-4 border-b-4 border-transparent border-r-white"></div>
            {dialogText}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCharacter;
