
import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Sound URLs
const AUDIO_URLS = {
  bgm: "https://assets.mixkit.co/music/download/mixkit-game-level-music-689.mp3",
  click: "https://assets.mixkit.co/sfx/download/mixkit-arcade-game-jump-coin-216.wav",
  hover: "https://assets.mixkit.co/sfx/download/mixkit-quick-jump-arcade-game-239.wav",
  collect: "https://assets.mixkit.co/sfx/download/mixkit-arcade-mechanical-bling-217.wav",
  success: "https://assets.mixkit.co/sfx/download/mixkit-unlock-game-notification-253.wav",
  error: "https://assets.mixkit.co/sfx/download/mixkit-falling-game-over-1942.wav"
};

const AudioController = () => {
  const [isMuted, setIsMuted] = useState(true);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    bgmRef.current = new Audio(AUDIO_URLS.bgm);
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.5;
    
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
  
  const playSound = (soundUrl: string) => {
    if (!isMuted) {
      const sound = new Audio(soundUrl);
      sound.volume = 0.5;
      sound.play().catch(e => console.error("Sound effect play failed:", e));
    }
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

// Export a function to play sounds that can be used throughout the app
export const useArcadeSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  
  const playSound = (soundType: 'click' | 'hover' | 'collect' | 'success' | 'error') => {
    if (isMuted) return;
    
    const sound = new Audio(AUDIO_URLS[soundType]);
    sound.volume = 0.3;
    sound.play().catch(e => console.error("Sound effect play failed:", e));
  };
  
  return { playSound, isMuted, setIsMuted };
};

export default AudioController;
