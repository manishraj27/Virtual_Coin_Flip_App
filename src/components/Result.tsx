import React from 'react';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

interface ResultProps {
  result: string | null;
  showResult: boolean;
}

const Result: React.FC<ResultProps> = ({ result, showResult }) => {
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showResult && resultRef.current && result) {
      // Animate result appearance
      gsap.fromTo(
        resultRef.current,
        { 
          scale: 0.5, 
          opacity: 0, 
          y: 10 
        },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          ease: "back.out(1.7)" 
        }
      );
    }
  }, [showResult, result]);

  if (!showResult || !result) {
    return <div className="h-16" />;
  }

  return (
    <div 
      ref={resultRef}
      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-xl border border-blue-500/30 w-full text-center"
    >
      <p className="text-slate-300 text-sm mb-1">The result is:</p>
      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        {result}
      </h3>
    </div>
  );
};

export default Result;