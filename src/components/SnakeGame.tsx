import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useArcadeSound } from './AudioController';
import { Checkbox } from '@/components/ui/checkbox';
import { Pause, Play, RefreshCw, ArrowRight, Check, XCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type Position = {
  x: number;
  y: number;
};

interface SkillFood {
  position: Position;
  isSkill: boolean;
  skill?: {
    name: string;
    description: string;
  };
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 1.1;
const ITEMS_BEFORE_SKILL = 3;

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

const getRandomSkill = (capturedSkills: string[]): SkillFood['skill'] => {
  const availableSkills = skills.filter(skill => !capturedSkills.includes(skill.name));
  
  if (availableSkills.length > 0) {
    return availableSkills[Math.floor(Math.random() * availableSkills.length)];
  }
  
  return skills[Math.floor(Math.random() * skills.length)];
};

const generateFood = (isSkill: boolean, capturedSkills: string[]): SkillFood => {
  if (isSkill) {
    const skill = getRandomSkill(capturedSkills);
    return {
      position: getRandomPosition(),
      isSkill: true,
      skill
    };
  } else {
    return {
      position: getRandomPosition(),
      isSkill: false
    };
  }
};

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [direction, setDirection] = useState<string>('right');
  const [capturedSkills, setCapturedSkills] = useState<string[]>([]);
  const [food, setFood] = useState<SkillFood>({ position: getRandomPosition(), isSkill: false });
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [allSkillsCaptured, setAllSkillsCaptured] = useState<boolean>(false);
  const [collectedSkill, setCollectedSkill] = useState<{name: string, description: string} | null>(null);
  const [showPopups, setShowPopups] = useState<boolean>(true);
  const [itemsCollected, setItemsCollected] = useState<number>(0);
  const { playSound, setIsGameActive } = useArcadeSound();
  
  const gameLoopRef = useRef<number | null>(null);
  const directionQueueRef = useRef<string[]>([]);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem('collectedSkills') || '[]');
    setCapturedSkills(savedSkills);
    
    setFood(generateFood(false, savedSkills));
  }, []);

  useEffect(() => {
    setIsGameActive(true);
    return () => setIsGameActive(false);
  }, [setIsGameActive]);

  useEffect(() => {
    if (openDialog || allSkillsCaptured) {
      setPaused(true);
    }
  }, [openDialog, allSkillsCaptured]);

  useEffect(() => {
    const popupSetting = localStorage.getItem('snakeGameShowPopups');
    if (popupSetting !== null) {
      setShowPopups(popupSetting === 'true');
    }
  }, []);

  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventArrowScroll);

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
      ctx.fillStyle = '#1A1F2C';
      ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      
      if (food.isSkill) {
        ctx.fillStyle = '#8B5CF6';
        ctx.fillRect(food.position.x * CELL_SIZE, food.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        ctx.fillStyle = 'white';
        ctx.font = '10px pixel, monospace';
        const skillText = food.skill?.name.slice(0, 3) || '';
        ctx.fillText(skillText, food.position.x * CELL_SIZE, (food.position.y * CELL_SIZE) + 14);
      } else {
        ctx.fillStyle = '#10B981';
        ctx.fillRect(food.position.x * CELL_SIZE, food.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }

      snake.forEach((segment, index) => {
        if (index === 0) {
          ctx.fillStyle = '#D946EF';
          ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else {
          ctx.fillStyle = '#9b87f5';
          ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      });
      
      ctx.fillStyle = '#33C3F0';
      ctx.font = '20px pixel, monospace';
      ctx.fillText(`SCORE: ${score}`, 10, 25);

      ctx.fillStyle = '#10B981';
      ctx.font = '12px pixel, monospace';
      ctx.fillText(`ITEMS: ${itemsCollected}/${ITEMS_BEFORE_SKILL}`, 10, 45);

      if (paused && !gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.fillStyle = 'white';
        ctx.font = '20px pixel, monospace';
        ctx.fillText('PAUSED', GRID_SIZE * CELL_SIZE / 2 - 45, GRID_SIZE * CELL_SIZE / 2);
      }
    };
    
    drawGame();
  }, [snake, food, score, paused, itemsCollected]);
  
  const moveSnake = () => {
    if (gameOver || paused) return;
    
    if (directionQueueRef.current.length > 0) {
      const nextDirection = directionQueueRef.current.shift();
      if (nextDirection) {
        setDirection(nextDirection);
      }
    }
    
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    
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
    
    newSnake.unshift(head);
    
    if (head.x === food.position.x && head.y === food.position.y) {
      setScore(prevScore => prevScore + (food.isSkill ? 5 : 1));
      
      if (food.isSkill && food.skill) {
        const newCapturedSkills = [...capturedSkills];
        
        if (!newCapturedSkills.includes(food.skill.name)) {
          newCapturedSkills.push(food.skill.name);
          setCapturedSkills(newCapturedSkills);
          localStorage.setItem('collectedSkills', JSON.stringify(newCapturedSkills));
        }
        
        if (showPopups) {
          setCollectedSkill(food.skill);
          setOpenDialog(true);
        }
        
        playSound('success');
        setItemsCollected(0);
        
        if (newCapturedSkills.length >= skills.length) {
          setAllSkillsCaptured(true);
          return;
        }
        
        setFood(generateFood(false, newCapturedSkills));
        setSpeed(prevSpeed => prevSpeed / SPEED_INCREASE);
      } else {
        playSound('collect');
        
        const newItemsCount = itemsCollected + 1;
        setItemsCollected(newItemsCount);
        
        if (newItemsCount >= ITEMS_BEFORE_SKILL) {
          setFood(generateFood(true, capturedSkills));
        } else {
          setFood(generateFood(false, capturedSkills));
        }
      }
    } else {
      newSnake.pop();
    }
    
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
          setPaused(prev => !prev);
          break;
        case 'r':
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
    setFood(generateFood(false, capturedSkills));
    setGameOver(false);
    setPaused(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setItemsCollected(0);
    setAllSkillsCaptured(false);
    directionQueueRef.current = [];
    playSound('click');
  };

  const resetAllSkills = () => {
    setCapturedSkills([]);
    localStorage.setItem('collectedSkills', JSON.stringify([]));
    
    resetGame();
  };

  const continueGame = () => {
    setAllSkillsCaptured(false);
    setPaused(false);
  };

  const togglePopups = () => {
    const newValue = !showPopups;
    setShowPopups(newValue);
    localStorage.setItem('snakeGameShowPopups', newValue.toString());
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (!gameOver && !allSkillsCaptured) {
      setPaused(false);
    }
  };

  return (
    <div 
      ref={gameContainerRef}
      className="bg-arcade-darker p-6 rounded-lg pixel-corners border-2 border-arcade-purple flex flex-col items-center relative"
      tabIndex={0}
    >
      <h2 className="text-xl text-white mb-4 font-pixel self-start">SKILL SNAKE GAME</h2>
      
      <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
        <div className="flex-1">
          <canvas 
            ref={canvasRef} 
            width={GRID_SIZE * CELL_SIZE} 
            height={GRID_SIZE * CELL_SIZE}
            className="border-2 border-arcade-purple"
          />
        </div>
        
        <div className="flex-none w-full md:w-[200px]">
          <Card className="bg-arcade-dark border-arcade-purple text-white h-full">
            <CardHeader className="px-3 py-2">
              <CardTitle className="text-arcade-green font-pixel text-sm">COLLECTED SKILLS</CardTitle>
            </CardHeader>
            <Separator className="bg-arcade-purple/30" />
            <CardContent className="p-3 overflow-y-auto max-h-[300px]">
              {skills.length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {skills.map((skill) => {
                    const isCollected = capturedSkills.includes(skill.name);
                    return (
                      <div 
                        key={skill.name} 
                        className={`flex items-center gap-2 p-1.5 rounded-md ${isCollected ? 'bg-arcade-purple/20' : 'bg-arcade-darker'}`}
                      >
                        <div className="flex-none">
                          {isCollected ? (
                            <Check size={16} className="text-arcade-green" />
                          ) : (
                            <XCircle size={16} className="text-arcade-orange/50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-pixel ${isCollected ? 'text-white' : 'text-gray-400'}`}>
                            {skill.name}
                          </p>
                        </div>
                        {isCollected && (
                          <Badge 
                            className="text-xxs bg-arcade-purple/50 hover:bg-arcade-purple" 
                            variant="default"
                          >
                            CAUGHT
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No skills available</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between w-full px-4 mb-3 gap-2">
        <div className="text-arcade-green font-pixel text-xs sm:text-sm">
          Arrow keys to control
        </div>
        <div className="text-arcade-orange font-pixel text-xs sm:text-sm">
          Every {ITEMS_BEFORE_SKILL} items = 1 skill
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm mb-3">
        <Checkbox 
          id="showPopups" 
          checked={showPopups} 
          onCheckedChange={togglePopups}
          className="bg-arcade-dark border-arcade-purple" 
        />
        <label htmlFor="showPopups" className="text-white cursor-pointer text-xs sm:text-sm">
          Show skill popups when collecting
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
      
      <AlertDialog open={allSkillsCaptured}>
        <AlertDialogContent className="bg-arcade-darker border-2 border-arcade-purple">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-arcade-green font-pixel text-xl">
              You joined the ranks!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-white py-4">
            Congratulations! You've collected all the skills. What would you like to do next?
          </p>
          <AlertDialogFooter>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-between">
              <button
                onClick={resetAllSkills}
                className="bg-arcade-orange text-white px-6 py-2 rounded-lg font-pixel hover:bg-opacity-80 flex items-center justify-center gap-2"
              >
                <RefreshCw size={16} />
                RESET
              </button>
              <button
                onClick={continueGame}
                className="bg-arcade-purple text-white px-6 py-2 rounded-lg font-pixel hover:bg-opacity-80 flex items-center justify-center gap-2"
              >
                <ArrowRight size={16} />
                CONTINUE
              </button>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SnakeGame;
