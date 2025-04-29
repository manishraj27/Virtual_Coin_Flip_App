import React from 'react';
import { Github, User } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-700/50 text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>© 2025 Virtual Coin Flip. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <button 
            onClick={() => onNavigate('/privacy')}
            className="hover:text-white transition-colors"
          >
            Privacy
          </button>
          <button 
            onClick={() => onNavigate('/terms')}
            className="hover:text-white transition-colors"
          >
            Terms
          </button>
          <button 
            onClick={() => onNavigate('https://github.com/manishraj27')}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </button>
          <button 
            onClick={() => onNavigate('https://manishraj.me/')}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <User className="h-4 w-4" />
            <span>Portfolio</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;