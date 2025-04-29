import React, { useState, useRef, useEffect } from 'react';
import OptionInput from './OptionInput';
import FlipButton from './FlipButton';
import Coin from './Coin';
import Result from './Result';
import SoundToggle from './SoundToggle';
import { useCryptoRandom } from '../hooks/useCryptoRandom';
import { useAudio } from '../hooks/useAudio';
import { HelpCircle } from 'lucide-react';

interface CoinFlipperProps {
  onExplainRandomness: () => void;
}

const CoinFlipper: React.FC<CoinFlipperProps> = ({ onExplainRandomness }) => {
  const [options, setOptions] = useState({
    option1: 'Heads',
    option2: 'Tails'
  });
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const { getRandomBoolean } = useCryptoRandom();
  const { play } = useAudio('/coin-flip.mp3');

  const flipTimeout = useRef<number | null>(null);
  const resultTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (flipTimeout.current) window.clearTimeout(flipTimeout.current);
      if (resultTimeout.current) window.clearTimeout(resultTimeout.current);
    };
  }, []);

  const handleOptionChange = (name: string, value: string) => {
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleFlip = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setShowResult(false);
    setResult(null);
    
    // Play sound if enabled
    if (isSoundEnabled) {
      play();
    }
    
    // Determine result using crypto random
    const isOption1 = getRandomBoolean();
    const selectedOption = isOption1 ? options.option1 : options.option2;
    
    // Set the result after animation
    flipTimeout.current = window.setTimeout(() => {
      setResult(selectedOption);
      setIsFlipping(false);
      
      // Show result with animation after a small delay
      resultTimeout.current = window.setTimeout(() => {
        setShowResult(true);
      }, 500);
    }, 2500);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Enter Your Options</h2>
        <div className="space-y-4">
          <OptionInput
            label="Option 1"
            name="option1"
            value={options.option1}
            onChange={(value) => handleOptionChange('option1', value)}
            disabled={isFlipping}
          />
          <OptionInput
            label="Option 2"
            name="option2"
            value={options.option2}
            onChange={(value) => handleOptionChange('option2', value)}
            disabled={isFlipping}
          />
        </div>
      </div>
      
      <div className="relative h-48 mb-6 flex items-center justify-center">
        <Coin isFlipping={isFlipping} />
      </div>
      
      <div className="flex flex-col items-center">
        <Result 
          result={result} 
          showResult={showResult} 
        />
        
        <div className="mt-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SoundToggle 
              enabled={isSoundEnabled} 
              onChange={setIsSoundEnabled} 
            />
            <button
              onClick={onExplainRandomness}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              aria-label="Learn about our randomness"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm">How random is it?</span>
            </button>
          </div>
          <FlipButton 
            onClick={handleFlip} 
            disabled={isFlipping} 
          />
        </div>
      </div>
    </div>
  );
};

export default CoinFlipper;