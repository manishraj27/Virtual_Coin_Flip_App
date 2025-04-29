import { useRef, useCallback, useState, useEffect } from 'react';

export const useAudio = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize audio on mount
  useEffect(() => {
    const audio = new Audio(src);
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });
    
    audio.addEventListener('error', () => {
      setError('Failed to load audio');
    });
    
    audioRef.current = audio;
    
    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [src]);

  // Play audio from the beginning
  const play = useCallback(() => {
    if (audioRef.current) {
      // Reset to beginning
      audioRef.current.currentTime = 0;
      
      // Play and handle any errors
      audioRef.current.play().catch(err => {
        console.error('Audio play error:', err);
        setError('Failed to play audio');
      });
    }
  }, []);

  // Pause audio
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  // Set volume (0 to 1)
  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    play,
    pause,
    setVolume,
    isLoaded,
    error
  };
};