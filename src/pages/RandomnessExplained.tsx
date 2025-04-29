import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Zap, Shield, Lock, Cpu, RefreshCw, Clock, Database } from 'lucide-react';
import { useCryptoRandom } from '../hooks/useCryptoRandom';

interface RandomnessExplainedProps {
  onNavigate: (path: string) => void;
}

const RandomnessExplained: React.FC<RandomnessExplainedProps> = ({ onNavigate }) => {
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [distributionData, setDistributionData] = useState<{ [key: string]: number }>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [entropyVisualization, setEntropyVisualization] = useState<string[]>([]);
  const { getRandomInt, getRandomValue } = useCryptoRandom();
  const animationRef = useRef<number | null>(null);

  // Generate a visual representation of entropy sources
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate a binary-like visualization of entropy
      const newEntropy = Array(8).fill(0).map(() => 
        Math.random() > 0.5 ? '1' : '0'
      ).join('');
      
      setEntropyVisualization(prev => {
        const updated = [newEntropy, ...prev];
        return updated.slice(0, 5); // Keep only the last 5 entries
      });
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, []);

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

  // Calculate chi-square test for randomness (simplified)
  const calculateChiSquare = () => {
    if (Object.keys(distributionData).length === 0) return null;
    
    const values = Object.values(distributionData);
    const expectedValue = randomNumbers.length / 10; // Expected even distribution
    
    let chiSquare = 0;
    values.forEach(observed => {
      chiSquare += Math.pow(observed - expectedValue, 2) / expectedValue;
    });
    
    return {
      value: chiSquare.toFixed(2),
      // For 9 degrees of freedom (10 categories - 1), 95% confidence threshold is ~16.92
      isPassing: chiSquare < 16.92
    };
  };

  const chiSquareResult = calculateChiSquare();

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
          Advanced Randomness Technology
        </h1>
        
        <div className="prose prose-invert prose-slate max-w-none mb-8">
          <p className="text-lg">
            Our Virtual Coin Flip uses multiple layers of entropy and advanced cryptographic techniques to ensure truly unpredictable results.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold m-0">Cryptographically Secure</h2>
              </div>
              <p>
                We use the Web Crypto API's <code>getRandomValues()</code> method as our primary entropy source, the same technology used in encryption and security applications.
              </p>
            </div>
            
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-green-400" />
                <h2 className="text-xl font-semibold m-0">Entropy Pool</h2>
              </div>
              <p>
                Our system maintains a constantly refreshing entropy pool that mixes multiple sources of randomness for enhanced unpredictability.
              </p>
            </div>
            
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl font-semibold m-0">Temporal Entropy</h2>
              </div>
              <p>
                We incorporate high-precision timestamps and counters as additional entropy sources, making each flip unique even with identical user inputs.
              </p>
            </div>
            
            <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="h-6 w-6 text-yellow-400" />
                <h2 className="text-xl font-semibold m-0">Continuous Refreshing</h2>
              </div>
              <p>
                Our entropy sources are continuously refreshed in the background, ensuring that randomness quality never degrades over time.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">Live Entropy Visualization</h2>
          <p className="mb-4">
            This is a simplified visualization of our entropy generation process. Each row represents a snapshot of entropy being added to our system.
          </p>
          
          <div className="font-mono text-sm bg-slate-900 p-4 rounded-lg mb-6 overflow-x-auto">
            {entropyVisualization.map((line, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-slate-500">entropy_{i}:</span>
                {line.split('').map((bit, j) => (
                  <span 
                    key={j} 
                    className={`inline-block w-6 h-6 flex items-center justify-center rounded 
                      ${bit === '1' 
                        ? 'bg-blue-500/30 text-blue-300' 
                        : 'bg-slate-700/50 text-slate-400'}`}
                  >
                    {bit}
                  </span>
                ))}
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Statistical Randomness Test</h2>
          <p className="mb-4">
            Click the button below to generate 1,000 random numbers between 1 and 10. We'll perform a chi-square test to verify the statistical randomness of our generator.
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
                <div className="w-full bg-slate-700 rounded-md overflow-hidden h-[100px] relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 absolute bottom-0 w-full transition-all duration-300"
                    style={{ 
                      height: `${distributionData[num] ? (distributionData[num] / 100) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="mt-2 text-slate-300">{num}</span>
                <span className="text-sm text-slate-400">{distributionData[num] || 0}</span>
              </div>
            ))}
          </div>
          
          {/* Chi-square test results */}
          {chiSquareResult && (
            <div className={`p-4 rounded-lg mb-6 ${chiSquareResult.isPassing ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'}`}>
              <h3 className="text-lg font-medium mb-2">Chi-Square Test Result</h3>
              <p>
                Chi-Square Value: <span className="font-mono">{chiSquareResult.value}</span>
                <span className={`ml-2 px-2 py-0.5 rounded text-xs ${chiSquareResult.isPassing ? 'bg-green-700' : 'bg-red-700'}`}>
                  {chiSquareResult.isPassing ? 'PASS' : 'FAIL'}
                </span>
              </p>
              <p className="text-sm mt-1">
                {chiSquareResult.isPassing 
                  ? 'The distribution passes the chi-square test, indicating good randomness.' 
                  : 'The distribution does not pass the chi-square test. Try generating again.'}
              </p>
            </div>
          )}
          
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
          <h2>Technical Deep Dive</h2>
          <p>
            Our randomness generation system uses a multi-layered approach:
          </p>
          
          <ol>
            <li>
              <strong>Primary Entropy Source:</strong> The Web Crypto API's <code>getRandomValues()</code> method, which provides cryptographically secure random values from your device's hardware random number generator when available.
            </li>
            <li>
              <strong>Entropy Pool:</strong> We maintain a constantly refreshing pool of random values that gets periodically updated to ensure long-term randomness quality.
            </li>
            <li>
              <strong>Entropy Mixing:</strong> We use bitwise operations and circular bit rotation to mix multiple entropy sources, creating a composite random value that's more unpredictable than any single source.
            </li>
            <li>
              <strong>Temporal Entropy:</strong> High-precision timestamps and internal counters add additional unpredictability to each random value.
            </li>
          </ol>
          
          <p>
            This approach ensures that our coin flip results are:
          </p>
          
          <ul>
            <li><strong>Unpredictable:</strong> Even knowing our algorithm, it's computationally infeasible to predict future results.</li>
            <li><strong>Unbiased:</strong> Each option has an exactly equal probability of being selected.</li>
            <li><strong>Independent:</strong> Each flip is completely independent of previous flips.</li>
          </ul>
          
          <blockquote>
            "Anyone who considers arithmetical methods of producing random digits is, of course, in a state of sin." — John von Neumann
          </blockquote>
          
          <p>
            That's why we don't rely solely on arithmetic methods, but instead combine hardware-based randomness with multiple entropy sources for the highest quality random results.
          </p>
        </div>
      </div>
    </main>
  );
};

export default RandomnessExplained;