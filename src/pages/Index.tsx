import React, { useState, useRef, useEffect } from 'react';
import ArcadeControls from '@/components/ArcadeControls';
import ArcadeButton from '@/components/ArcadeButton';
import AvatarCharacter from '@/components/AvatarCharacter';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import SnakeGame from '@/components/SnakeGame';
import AudioController, { AudioProvider } from '@/components/AudioController';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      if (loadingBarRef.current) {
        const currentWidth = parseInt(loadingBarRef.current.style.width || '0');
        
        if (currentWidth < 100) {
          loadingBarRef.current.style.width = `${currentWidth + 5}%`;
        } else {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setIsLoading(false);
            toast({
              title: "Game Loaded!",
              description: "Use the arcade controls to navigate",
              duration: 5000,
            });
          }, 500);
        }
      }
    }, 100);
    
    return () => clearInterval(loadingInterval);
  }, []);
  
  const handleControlClick = (section: string) => {
    if (section === 'start') {
      localStorage.removeItem('collectedSkills');
      window.location.reload();
      return;
    }
    
    setActiveSection(section);
  };
  
  const handleAvatarGuide = (section: string) => {
    if (section) {
      setActiveSection(section);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-arcade-darker flex-col">
        <h1 className="text-3xl font-pixel text-arcade-purple mb-8">RETRO QUEST</h1>
        <div className="w-64 h-6 bg-arcade-dark border-2 border-arcade-purple rounded-lg overflow-hidden">
          <div
            ref={loadingBarRef}
            className="h-full bg-arcade-purple"
            style={{ width: '0%', transition: 'width 0.1s ease-in' }}
          ></div>
        </div>
        <p className="text-gray-400 mt-4 font-pixel text-sm">LOADING PORTFOLIO...</p>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'contact':
        return <ContactSection />;
      case 'game':
        return <SnakeGame />;
      default:
        return <AboutSection />;
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen bg-arcade-dark text-white pb-8 pt-4 relative overflow-hidden">
        <div className="scanlines"></div>
        
        <AudioController />
        
        <div className="container mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-pixel text-arcade-purple mb-2">JASWANTH'S QUEST</h1>
            <p className="text-gray-300">A Full-Stack Developer's Arcade Adventure</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-12 bg-arcade-darker p-1 rounded-lg border-4 border-arcade-purple relative overflow-hidden crt">
              <div className="bg-arcade-dark p-6 min-h-[500px] relative">
                <AvatarCharacter onGuide={handleAvatarGuide} />
                
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-pixel text-arcade-purple">
                    {activeSection.toUpperCase()} MISSION
                  </h2>
                  
                  <div className="flex items-center gap-2 px-3 py-1 bg-arcade-darker rounded-lg">
                    <span className="w-2 h-2 rounded-full bg-arcade-green animate-blink"></span>
                    <span className="text-xs text-arcade-green font-pixel">SYSTEM ONLINE</span>
                  </div>
                </div>
                
                {renderSection()}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <ArcadeControls 
              onControlClick={handleControlClick}
              activeSection={activeSection}
            />
            
            <div className="flex justify-center mt-4">
              <ArcadeButton 
                color="orange" 
                className="px-6"
                onClick={() => setActiveSection('game')}
              >
                PLAY SNAKE GAME
              </ArcadeButton>
            </div>
          </div>
          
          <footer className="text-center text-gray-400 text-sm">
            <p>© 2025 JASWANTH'S QUEST. All rights reserved.</p>
            <p className="mt-1 text-xs">Use arrow keys or arcade controls to navigate</p>
          </footer>
        </div>
      </div>
    </AudioProvider>
  );
};

export default Index;
