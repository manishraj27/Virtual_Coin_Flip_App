import React from 'react';
import { Shuffle } from 'lucide-react';

interface FlipButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const FlipButton: React.FC<FlipButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
        ${disabled 
          ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
          : 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 hover:from-yellow-400 hover:to-amber-400 shadow-lg'
        }
        transition-all duration-300 ease-out
      `}
    >
      <Shuffle className={`h-5 w-5 ${disabled ? 'animate-spin' : ''}`} />
      <span>{disabled ? 'Flipping...' : 'Flip Coin'}</span>
    </button>
  );
};

export default FlipButton;