import React from 'react';
import { Coins, Home } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('/')}
        >
          <Coins className="h-8 w-8 text-yellow-400" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Virtual Coin Flip
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('/')}
            className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </button>
          <span className="text-sm text-slate-400">Decision maker for 2025</span>
        </div>
      </div>
    </header>
  );
};

export default Header;