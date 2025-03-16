
import React from 'react';
import { cn } from '@/lib/utils';
import { useArcadeSound } from './AudioController';

interface ArcadeButtonProps {
  children: React.ReactNode;
  color?: 'purple' | 'blue' | 'orange' | 'green' | 'pink';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ArcadeButton: React.FC<ArcadeButtonProps> = ({
  children,
  color = 'purple',
  onClick,
  className,
  disabled = false,
  type = 'button'
}) => {
  const { playSound } = useArcadeSound();
  
  const colorClasses = {
    purple: 'bg-arcade-purple',
    blue: 'bg-arcade-blue',
    orange: 'bg-arcade-orange',
    green: 'bg-arcade-green',
    pink: 'bg-arcade-pink',
  };

  const handleClick = () => {
    if (!disabled) {
      playSound('click');
      onClick && onClick();
    }
  };
  
  const handleMouseEnter = () => {
    if (!disabled) {
      playSound('hover');
    }
  };

  return (
    <button
      className={cn(
        'arcade-btn',
        colorClasses[color],
        'text-white',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default ArcadeButton;
