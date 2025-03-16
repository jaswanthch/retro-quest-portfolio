
import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Create context for audio controls
interface AudioContextType {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: (soundType: 'click' | 'hover' | 'collect' | 'success' | 'error') => void;
  isGameActive: boolean;
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Sound URLs from public folder
const AUDIO_URLS = {
  bgm: "/audio/bgm.mp3",
  click: "/audio/click.mp3",
  hover: "/audio/hover.mp3",
  collect: "/audio/collect.mp3",
  success: "/audio/success.mp3",
  error: "/audio/error.mp3"
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [volume, setVolume] = useState(50); // Volume as percentage (0-100)
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    bgmRef.current = new Audio(AUDIO_URLS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = (volume / 100) * 0.5; // Scale to max of 0.5 volume
    
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);
  
  // Handle volume changes when game state or volume changes
  useEffect(() => {
    if (bgmRef.current && !isMuted) {
      // During game, reduce volume further
      const baseVolume = volume / 100;
      bgmRef.current.volume = isGameActive ? baseVolume * 0.25 : baseVolume * 0.5;
    }
  }, [isGameActive, isMuted, volume]);
  
  const playSound = (soundType: 'click' | 'hover' | 'collect' | 'success' | 'error') => {
    if (isMuted) return;
    
    const sound = new Audio(AUDIO_URLS[soundType]);
    sound.volume = (volume / 100) * 0.6; // Scale effect volume
    sound.play().catch(e => console.error("Sound effect play failed:", e));
  };
  
  const contextValue: AudioContextType = {
    isMuted,
    setIsMuted,
    playSound,
    isGameActive,
    setIsGameActive,
    volume,
    setVolume
  };
  
  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

// Hook for components to access audio functionality
export const useArcadeSound = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useArcadeSound must be used within an AudioProvider');
  }
  return context;
};

const AudioController = () => {
  const { isMuted, setIsMuted, volume, setVolume } = useArcadeSound();
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  useEffect(() => {
    bgmRef.current = new Audio(AUDIO_URLS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = (volume / 100) * 0.5; // 50% max volume
    
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, [volume]);
  
  const toggleMute = () => {
    if (bgmRef.current) {
      if (isMuted) {
        bgmRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        bgmRef.current.pause();
      }
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeX size={20} />;
    if (volume < 30) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div 
        className="relative"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button 
          onClick={toggleMute}
          className="bg-arcade-purple rounded-full p-2 text-white hover:bg-opacity-80 transition-all"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {getVolumeIcon()}
        </button>
        
        {showVolumeSlider && (
          <div className="absolute right-0 mt-2 p-4 bg-arcade-darker border border-arcade-purple rounded-lg shadow-lg min-w-32">
            <Slider 
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="w-full"
            />
            <p className="text-white text-xs mt-2 text-center">{volume}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioController;
