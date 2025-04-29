import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (path: string) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <main className="flex-grow flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium
              bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 hover:from-yellow-400 hover:to-amber-400
              transition-all duration-300 ease-out"
          >
            <Home className="h-5 w-5" />
            <span>Go to Home</span>
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium
              bg-slate-700 text-white hover:bg-slate-600
              transition-all duration-300 ease-out"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;