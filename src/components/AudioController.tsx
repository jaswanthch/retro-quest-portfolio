import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Sound URLs from public folder
const AUDIO_URLS = {
  bgm: "/audio/bgm.mp3",
  click: "/audio/click.mp3",
  hover: "/audio/hover.mp3",
  collect: "/audio/collect.mp3",
  success: "/audio/success.mp3",
  error: "/audio/error.mp3"
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
