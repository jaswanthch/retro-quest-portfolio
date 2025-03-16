
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ArcadeButton from "@/components/ArcadeButton";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-arcade-dark relative overflow-hidden">
      {/* CRT Scanlines Effect */}
      <div className="scanlines"></div>
      
      <div className="text-center max-w-md p-8 bg-arcade-darker rounded-lg pixel-corners border-2 border-arcade-purple crt">
        <h1 className="text-6xl font-pixel text-arcade-orange mb-4 animate-glitch">404</h1>
        <p className="text-xl text-arcade-purple font-pixel mb-6">GAME OVER</p>
        <p className="text-white mb-8">Player, this level does not exist in our world. Let's return to the main quest.</p>
        
        <ArcadeButton
          color="green"
          onClick={() => window.location.href = '/'}
        >
          <Home size={16} className="mr-2" /> CONTINUE QUEST
        </ArcadeButton>
      </div>
    </div>
  );
};

export default NotFound;
