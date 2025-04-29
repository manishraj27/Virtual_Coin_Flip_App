import { useState, useCallback, useEffect } from 'react';

/**
 * A hook that provides enhanced cryptographically secure random number generation
 * using multiple entropy sources and mixing techniques
 */
export const useCryptoRandom = () => {
  // Internal entropy pool to mix additional randomness sources
  const [entropyPool, setEntropyPool] = useState<Uint32Array>(new Uint32Array(4));
  
  // Counter for additional entropy
  const [counter, setCounter] = useState(0);
  
  // Initialize and periodically refresh the entropy pool
  useEffect(() => {
    // Initial entropy pool setup
    const newPool = new Uint32Array(4);
    window.crypto.getRandomValues(newPool);
    setEntropyPool(newPool);
    
    // Periodically refresh part of the entropy pool
    const intervalId = setInterval(() => {
      setEntropyPool(prevPool => {
        const updatedPool = new Uint32Array(prevPool);
        // Only update one element to mix old and new entropy
        const updateIndex = Math.floor(Math.random() * updatedPool.length);
        const singleValue = new Uint32Array(1);
        window.crypto.getRandomValues(singleValue);
        updatedPool[updateIndex] = singleValue[0];
        return updatedPool;
      });
      
      // Increment counter for additional entropy
      setCounter(prev => (prev + 1) % Number.MAX_SAFE_INTEGER);
    }, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Mix entropy sources using a simple mixing function
  const mixEntropy = useCallback((input: number): number => {
    // Get current timestamp for additional entropy
    const timestamp = Date.now();
    
    // Mix with entropy pool using bitwise operations
    let mixed = input;
    for (let i = 0; i < entropyPool.length; i++) {
      mixed ^= entropyPool[i];
      mixed = (mixed << 5) | (mixed >>> 27); // Circular bit rotation
      mixed += timestamp ^ counter;
    }
    
    // Normalize to [0, 1) range
    return (mixed >>> 0) / (0xffffffff + 1);
  }, [entropyPool, counter]);

  // Get a random number between 0 and 1 with enhanced entropy
  const getRandomValue = useCallback((): number => {
    // Create a new Uint32Array with one element
    const array = new Uint32Array(1);
    
    // Fill the array with a random value using crypto.getRandomValues
    window.crypto.getRandomValues(array);
    
    // Mix with additional entropy sources
    return mixEntropy(array[0]);
  }, [mixEntropy]);

  // Get a random boolean with 50/50 probability
  const getRandomBoolean = useCallback((): boolean => {
    return getRandomValue() < 0.5;
  }, [getRandomValue]);

  // Get a random integer between min and max (inclusive)
  const getRandomInt = useCallback((min: number, max: number): number => {
    const range = max - min + 1;
    return Math.floor(getRandomValue() * range) + min;
  }, [getRandomValue]);
  
  // Get a random item from an array
  const getRandomItem = useCallback(<T>(array: T[]): T => {
    if (array.length === 0) {
      throw new Error("Cannot get random item from empty array");
    }
    const index = getRandomInt(0, array.length - 1);
    return array[index];
  }, [getRandomInt]);

  return {
    getRandomValue,
    getRandomBoolean,
    getRandomInt,
    getRandomItem
  };
};