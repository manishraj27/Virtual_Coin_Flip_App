import { useState, useCallback } from 'react';

/**
 * A hook that provides cryptographically secure random number generation
 * using the Web Crypto API
 */
export const useCryptoRandom = () => {
  // Get a random number between 0 and 1
  const getRandomValue = useCallback((): number => {
    // Create a new Uint32Array with one element
    const array = new Uint32Array(1);
    
    // Fill the array with a random value using crypto.getRandomValues
    window.crypto.getRandomValues(array);
    
    // Convert to a number between 0 and 1
    return array[0] / (0xffffffff + 1);
  }, []);

  // Get a random boolean with 50/50 probability
  const getRandomBoolean = useCallback((): boolean => {
    return getRandomValue() < 0.5;
  }, [getRandomValue]);

  // Get a random integer between min and max (inclusive)
  const getRandomInt = useCallback((min: number, max: number): number => {
    const range = max - min + 1;
    return Math.floor(getRandomValue() * range) + min;
  }, [getRandomValue]);

  return {
    getRandomValue,
    getRandomBoolean,
    getRandomInt
  };
};