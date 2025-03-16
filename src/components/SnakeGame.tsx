import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useArcadeSound } from './AudioController';
import { Checkbox } from '@/components/ui/checkbox';
import { Pause, Play } from 'lucide-react';

type Position = {
  x: number;
  y: number;
};

interface SkillFood {
  position: Position;
  skill: {
    name: string;
    description: string;
  };
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 1.2;

const skills = [
  { name: 'JavaScript', description: 'A programming language for the web.' },
  { name: 'React', description: 'A JavaScript library for building user interfaces.' },
  { name: 'TypeScript', description: 'JavaScript with syntax for types.' },
  { name: 'Vite', description: 'Next Generation Frontend Tooling.' },
  { name: 'Tailwind CSS', description: 'A utility-first CSS framework.' },
  { name: 'Next.js', description: 'The React Framework for Production.' },
  { name: 'MongoDB', description: 'The application data platform.' },
  { name: 'WordPress', description: 'The world\'s most popular CMS.' },
  { name: 'PHP', description: 'Hypertext Preprocessor.' },
  { name: 'MySQL', description: 'The world\'s most popular open source database.' },
];

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const getRandomSkill = (): SkillFood => ({
  position: getRandomPosition(),
  skill: skills[Math.floor(Math.random() * skills.length)],
});

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [direction, setDirection] = useState<string>('right');
  const [food, setFood] = useState<SkillFood>(getRandomSkill());
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [collectedSkill, setCollectedSkill] = useState<{name: string, description: string} | null>(null);
  const [showPopups, setShowPopups] = useState<boolean>(true);
  const { playSound, setIsGameActive } = useArcadeSound();
  
  const gameLoopRef = useRef<number | null>(null);
  const directionQueueRef = useRef<string[]>([]);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Set the game active state when component mounts or unmounts
  useEffect(() => {
    setIsGameActive(true);
    return () => setIsGameActive(false);
  }, [setIsGameActive]);

  // Pause game when dialog opens
  useEffect(() => {
    if (openDialog) {
      setPaused(true);
    }
  }, [openDialog]);

  useEffect(() => {
    // Load popup preferences
    const popupSetting = localStorage.getItem('snakeGameShowPopups');
    if (popupSetting !== null) {
      setShowPopups(popupSetting === 'true');
    }
  }, []);

  // Prevent page scrolling with arrow keys
  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    // Add the event listener to prevent default behavior for arrow keys
    window.addEventListener('keydown', preventArrowScroll);

    // Clean up
    return () => {
      window.removeEventListener('keydown', preventArrowScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawGame = () => {
      // Clear canvas
      ctx.fillStyle = '#1A1F2C'; // arcade-darker color
      ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      
      // Draw food
      ctx.fillStyle = '#8B5CF6'; // arcade-purple color
      ctx.fillRect(food.position.x * CELL_SIZE, food.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

      // Draw skill name
      ctx.fillStyle = 'white';
      ctx.font = '10px pixel, monospace';
      const skillText = food.skill.name.slice(0, 3);
      ctx.fillText(skillText, food.position.x * CELL_SIZE, (food.position.y * CELL_SIZE) + 14);
      
      // Draw snake
      snake.forEach((segment, index) => {
        if (index === 0) {
          // Head
          ctx.fillStyle = '#D946EF'; // arcade-pink color
        } else {
          // Body
          ctx.fillStyle = '#9b87f5'; // arcade-purple color
        }
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      });
      
      // Draw score
      ctx.fillStyle = '#33C3F0'; // arcade-blue color
      ctx.font = '20px pixel, monospace';
      ctx.fillText(`SCORE: ${score}`, 10, 25);

      // Draw pause/play icon if game is paused
      if (paused && !gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.fillStyle = 'white';
        ctx.font = '20px pixel, monospace';
        ctx.fillText('PAUSED', GRID_SIZE * CELL_SIZE / 2 - 45, GRID_SIZE * CELL_SIZE / 2);
      }
    };
    
    drawGame();
  }, [snake, food, score, paused]);
  
  const moveSnake = () => {
    if (gameOver || paused) return;
    
    // Process the next direction from the queue if available
    if (directionQueueRef.current.length > 0) {
      const nextDirection = directionQueueRef.current.shift();
      if (nextDirection) {
        setDirection(nextDirection);
      }
    }
    
    // Create a copy of the snake array
    const newSnake = [...snake];
    // Get the head of the snake
    const head = { ...newSnake[0] };
    
    // Move the head based on the direction
    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
      default:
        break;
    }
    
    // Check if the game is over (collision with walls or self)
    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      playSound('error');
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
      return;
    }
    
    // Add the new head to the beginning of the snake array
    newSnake.unshift(head);
    
    // Check if the snake has eaten the food
    if (head.x === food.position.x && head.y === food.position.y) {
      // Increase score
      setScore(prevScore => prevScore + 1);
      
      // Show skill dialog if popups are enabled
      if (showPopups) {
        setCollectedSkill(food.skill);
        setOpenDialog(true);
      }
      
      // Play sound
      playSound('collect');
      
      // Generate new food
      setFood(getRandomSkill());
      
      // Increase speed
      setSpeed(prevSpeed => prevSpeed / SPEED_INCREASE);
    } else {
      // Remove the tail if the snake didn't eat food
      newSnake.pop();
    }
    
    // Update the snake state
    setSnake(newSnake);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') {
            directionQueueRef.current.push('up');
          }
          break;
        case 'ArrowDown':
          if (direction !== 'up') {
            directionQueueRef.current.push('down');
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'right') {
            directionQueueRef.current.push('left');
          }
          break;
        case 'ArrowRight':
          if (direction !== 'left') {
            directionQueueRef.current.push('right');
          }
          break;
        case ' ':
          // Space bar to pause/resume
          setPaused(prev => !prev);
          break;
        case 'r':
          // R key to restart
          if (gameOver) {
            resetGame();
          }
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, gameOver]);
  
  useEffect(() => {
    if (!gameOver && !paused) {
      gameLoopRef.current = window.setTimeout(moveSnake, speed);
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [snake, gameOver, paused, speed]);
  
  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setDirection('right');
    setFood(getRandomSkill());
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    directionQueueRef.current = [];
    playSound('click');
  };

  const togglePopups = () => {
    const newValue = !showPopups;
    setShowPopups(newValue);
    localStorage.setItem('snakeGameShowPopups', newValue.toString());
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (!gameOver) {
      setPaused(false);
    }
  };

  return (
    <div 
      ref={gameContainerRef}
      className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple flex flex-col items-center relative"
      tabIndex={0} // Make the container focusable
    >
      <h2 className="text-xl text-white mb-4 font-pixel self-start">SKILL SNAKE GAME</h2>
      
      <canvas 
        ref={canvasRef} 
        width={GRID_SIZE * CELL_SIZE} 
        height={GRID_SIZE * CELL_SIZE}
        className="border-2 border-arcade-purple mb-4"
      />
      
      <div className="flex justify-between w-full px-4 mb-3">
        <div className="text-arcade-green font-pixel text-sm">
          Use arrow keys to control the snake
        </div>
        <div className="text-arcade-orange font-pixel text-sm">
          Press 'Space' to {paused ? 'resume' : 'pause'}, 'R' to restart
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm mb-3">
        <Checkbox 
          id="showPopups" 
          checked={showPopups} 
          onCheckedChange={togglePopups}
          className="bg-arcade-dark border-arcade-purple" 
        />
        <label htmlFor="showPopups" className="text-white cursor-pointer">
          Show skill popups when collecting items
        </label>
      </div>

      <button
        onClick={() => setPaused(!paused)}
        className="bg-arcade-purple text-white px-3 py-1 rounded-lg font-pixel hover:bg-opacity-80 flex items-center gap-2"
      >
        {paused ? <Play size={16} /> : <Pause size={16} />}
        {paused ? 'RESUME' : 'PAUSE'}
      </button>
      
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-arcade-darker p-6 rounded-lg border-2 border-arcade-purple text-center">
            <h3 className="text-xl text-arcade-orange font-pixel mb-4">GAME OVER</h3>
            <p className="text-white mb-4">Score: {score}</p>
            <button 
              onClick={resetGame}
              className="bg-arcade-purple text-white px-6 py-2 rounded-lg font-pixel hover:bg-opacity-80"
            >
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
      
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-arcade-darker border-2 border-arcade-purple">
          <DialogHeader>
            <DialogTitle className="text-arcade-green font-pixel text-xl">
              Skill Collected!
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <h3 className="text-arcade-purple font-pixel text-lg mb-2">
              {collectedSkill?.name}
            </h3>
            <p className="text-white">
              {collectedSkill?.description}
            </p>
            <p className="text-arcade-orange mt-4 text-sm">
              Snake speed increased! Keep collecting skills!
            </p>
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleCloseDialog}
                className="bg-arcade-purple text-white px-4 py-1 rounded font-pixel hover:bg-opacity-80"
              >
                CONTINUE
              </button>
              <button 
                onClick={() => {
                  togglePopups();
                  handleCloseDialog();
                }}
                className="bg-arcade-orange text-white px-4 py-1 rounded font-pixel hover:bg-opacity-80"
              >
                {showPopups ? "DISABLE POPUPS" : "ENABLE POPUPS"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SnakeGame;
