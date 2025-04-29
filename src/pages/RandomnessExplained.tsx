import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Zap, Shield, Lock, Cpu } from 'lucide-react';
import { useCryptoRandom } from '../hooks/useCryptoRandom';

interface RandomnessExplainedProps {
  onNavigate: (path: string) => void;
}

const RandomnessExplained: React.FC<RandomnessExplainedProps> = ({ onNavigate }) => {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [distributionData, setDistributionData] = useState<{ [key: string]: number }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const { getRandomInt } = useCryptoRandom();
  const animationRef = useRef<number | null>(null);

  // Generate a batch of random numbers
  const generateRandomNumbers = () => {
    setIsGenerating(true);
    setRandomNumbers([]);
    setDistributionData({});
    
    let count = 0;
    const maxCount = 1000;
    const distribution: { [key: string]: number } = {};
    
    const generate = () => {
      if (count < maxCount) {
        // Generate 5 random numbers per frame for better performance
        for (let i = 0; i < 5 && count < maxCount; i++) {
          const num = getRandomInt(1, 10);
          setRandomNumbers(prev => [...prev, num]);
          
          // Update distribution
          distribution[num] = (distribution[num] || 0) + 1;
          setDistributionData({...distribution});
          
          count++;
        }
        animationRef.current = requestAnimationFrame(generate);
      } else {
        setIsGenerating(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(generate);
  };
  
  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => onNavigate('/')}
          className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          The Science of Our Randomness
        </h1>
        
        <div className="prose prose-invert prose-slate max-w-none mb-8">
          <p className="text-lg">
            Not all random number generators are created equal. Here's why ours is special:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold m-0">Cryptographically Secure</h2>
              </div>
              <p>
                We use the Web Crypto API's <code>getRandomValues()</code> method, which provides cryptographically secure random values. This is the same technology used in encryption and security applications.
              </p>
            </div>
            
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-6 w-6 text-green-400" />
                <h2 className="text-xl font-semibold m-0">Hardware-Based</h2>
              </div>
              <p>
                Unlike simple software-based random number generators, the Web Crypto API typically uses hardware sources of entropy, making predictions virtually impossible.
              </p>
            </div>
            
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl font-semibold m-0">Truly Unpredictable</h2>
              </div>
              <p>
                Our random generator is designed to be unpredictable even to us. No patterns, no biases, just pure randomness for fair decisions every time.
              </p>
            </div>
            
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-6 w-6 text-yellow-400" />
                <h2 className="text-xl font-semibold m-0">Lightning Fast</h2>
              </div>
              <p>
                Despite its security, our randomness generator is incredibly fast, providing instant results without any noticeable delay.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">See It In Action</h2>
          <p className="mb-4">
            Click the button below to generate 1,000 random numbers between 1 and 10. Watch the distribution in real-time to see how our random number generator creates an even distribution.
          </p>
          
          <button
            onClick={generateRandomNumbers}
            disabled={isGenerating}
            className={`
              px-4 py-2 rounded-lg font-medium mb-6
              ${isGenerating 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-400 hover:to-purple-400'
              }
              transition-all duration-300 ease-out
            `}
          >
            {isGenerating ? 'Generating...' : 'Generate Random Numbers'}
          </button>
          
          {/* Distribution visualization */}
          <div className="grid grid-cols-10 gap-2 mb-4">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <div key={num} className="flex flex-col items-center">
                <div className="w-full bg-slate-700 rounded-md overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{ 
                      height: '100px', 
                      width: '100%',
                      transform: `scaleY(${distributionData[num] ? distributionData[num] / 100 : 0})`,
                      transformOrigin: 'bottom'
                    }}
                  />
                </div>
                <span className="mt-2 text-slate-300">{num}</span>
                <span className="text-sm text-slate-400">{distributionData[num] || 0}</span>
              </div>
            ))}
          </div>
          
          {/* Last 20 numbers */}
          <div>
            <h3 className="text-lg font-medium mb-2">Last 20 numbers:</h3>
            <div className="flex flex-wrap gap-2">
              {randomNumbers.slice(-20).map((num, index) => (
                <span 
                  key={index} 
                  className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium animate-pop-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="prose prose-invert prose-slate max-w-none">
          <h2>Why Randomness Matters</h2>
          <p>
            When making decisions with a coin flip, true randomness is essential for fair results. Many simple random number generators use predictable algorithms that can be biased or follow patterns over time.
          </p>
          
          <p>
            Our Virtual Coin Flip uses the highest standard of randomness available in modern browsers to ensure that each flip is completely independent and unbiased. Whether you're deciding what to eat for dinner or making important life choices, you can trust that our coin flip is giving you a truly random result.
          </p>
          
          <blockquote>
            "Anyone who considers arithmetical methods of producing random digits is, of course, in a state of sin." — John von Neumann
          </blockquote>
        </div>
      </div>
    </main>
  );
};

export default RandomnessExplained;