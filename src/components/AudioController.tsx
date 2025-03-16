
import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Create context for audio controls
interface AudioContextType {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: (soundType: 'click' | 'hover' | 'collect' | 'success' | 'error') => void;
  isGameActive: boolean;
  setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
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
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    bgmRef.current = new Audio(AUDIO_URLS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2; // Default 20% volume
    
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);
  
  // Handle volume changes when game state changes
  useEffect(() => {
    if (bgmRef.current && !isMuted) {
      bgmRef.current.volume = isGameActive ? 0.05 : 0.2; // Reduce to 5% during game
    }
  }, [isGameActive, isMuted]);
  
  const playSound = (soundType: 'click' | 'hover' | 'collect' | 'success' | 'error') => {
    if (isMuted) return;
    
    const sound = new Audio(AUDIO_URLS[soundType]);
    sound.volume = 0.3;
    sound.play().catch(e => console.error("Sound effect play failed:", e));
  };
  
  const contextValue: AudioContextType = {
    isMuted,
    setIsMuted,
    playSound,
    isGameActive,
    setIsGameActive
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
  const { isMuted, setIsMuted } = useArcadeSound();
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    bgmRef.current = new Audio(AUDIO_URLS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.2; // 20% volume
    
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);
  
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

  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={toggleMute}
        className="bg-arcade-purple rounded-full p-2 text-white hover:bg-opacity-80 transition-all"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export default AudioController;
