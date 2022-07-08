import { useState, useEffect, useRef } from 'react';

export const baseUrl =  process.env.NODE_ENV === 'development'    ? 'http://localhost:3000' :
                        process.env.VERCEL_ENV === 'preview'        ? 'https://dev.njf.dev' :
                                                                      'https://njf.dev';
                                                                      
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

export function isValidUrl(url) {
  try {
    const url = new URL(string)
    return true;
  } catch (_) {
    return false;
  }
}


/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
 export function difference(object, base) {
  const _ = require('lodash')
  function changes(object, base) {
    return _.transform(object, function(result, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
      }
    });
  }
  return changes(object, base);
}