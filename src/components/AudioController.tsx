
import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioController = () => {
  const [isMuted, setIsMuted] = useState(true);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    bgmRef.current = new Audio("https://freesound.org/data/previews/588/588466_7666867-lq.mp3"); // Placeholder chiptune
    bgmRef.current.loop = true;
    
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
  const [isMuted, setIsMuted] = useState(true);
  
  const playSound = (soundType: 'click' | 'hover' | 'collect' | 'success' | 'error') => {
    if (isMuted) return;
    
    const soundUrls: Record<string, string> = {
      click: "https://freesound.org/data/previews/528/528866_9282034-lq.mp3",
      hover: "https://freesound.org/data/previews/528/528865_9282034-lq.mp3",
      collect: "https://freesound.org/data/previews/403/403013_5121236-lq.mp3",
      success: "https://freesound.org/data/previews/387/387232_7255534-lq.mp3",
      error: "https://freesound.org/data/previews/334/334404_5237719-lq.mp3"
    };
    
    const sound = new Audio(soundUrls[soundType]);
    sound.volume = 0.3;
    sound.play().catch(e => console.error("Sound effect play failed:", e));
  };
  
  return { playSound, isMuted, setIsMuted };
};

export default AudioController;
