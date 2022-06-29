import { useState, useEffect, useRef } from 'react';

export const baseUrl =  process.env.VERCEL_ENV === 'development'    ? 'http://localhost:3000' :
                        process.env.VERCEL_ENV === 'preview'        ? `https://${process.env.VERCEL_URL}` :
                                                                      "https://njf.dev";
                                                                      
export function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}