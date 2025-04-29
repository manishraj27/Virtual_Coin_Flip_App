import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface CoinProps {
  isFlipping: boolean;
}

const Coin: React.FC<CoinProps> = ({ isFlipping }) => {
  const coinRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // Initialize coin and prepare animation timeline
  useEffect(() => {
    if (!coinRef.current) return;

    // Set initial coin perspective
    gsap.set(coinRef.current, {
      perspective: 800,
    });

    // Create animation timeline but don't play it yet
    tl.current = gsap.timeline({ paused: true })
      .to(coinRef.current, { 
        rotationY: 1800, // Multiple full rotations for realistic effect
        duration: 2.5,
        ease: "power2.out"
      })
      .to(coinRef.current, {
        y: [
          { value: -100, duration: 0.5, ease: "power1.out" },
          { value: 0, duration: 2, ease: "bounce.out" }
        ],
      }, 0); // Start at the same time
  }, []);

  // Trigger flip animation when isFlipping changes
  useEffect(() => {
    if (!tl.current) return;

    if (isFlipping) {
      // Reset and play
      tl.current.restart();
    }
  }, [isFlipping]);

  return (
    <div className="relative" style={{ perspective: '800px' }}>
      <div
        ref={coinRef}
        className="relative w-32 h-32 transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side of the coin */}
        <div
          ref={frontRef}
          className="absolute backface-hidden w-full h-full rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center border-8 border-yellow-600 shadow-md"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
          }}
        >
          <div className="w-3/4 h-3/4 rounded-full border-4 border-yellow-700 flex items-center justify-center">
            <span className="text-yellow-900 text-lg font-bold">H</span>
          </div>
        </div>

        {/* Back side of the coin */}
        <div
          ref={backRef}
          className="absolute backface-hidden w-full h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center border-8 border-amber-700 shadow-md"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="w-3/4 h-3/4 rounded-full border-4 border-amber-800 flex items-center justify-center">
            <span className="text-amber-900 text-lg font-bold">T</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;