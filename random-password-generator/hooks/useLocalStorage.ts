'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for managing state synchronized with localStorage
 * @param key - The localStorage key
 * @param initialValue - Initial value if no stored value exists
 * @returns [storedValue, setValue] tuple
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook for managing an array in localStorage with common array operations
 * @param key - The localStorage key
 * @param initialValue - Initial array value
 * @returns Object with array value and helper methods
 */
export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
) {
  const [array, setArray] = useLocalStorage<T[]>(key, initialValue);

  const addItem = (item: T) => {
    setArray(prev => [...prev, item]);
  };

  const removeItem = (predicate: (item: T) => boolean) => {
    setArray(prev => prev.filter(item => !predicate(item)));
  };

  const updateItem = (predicate: (item: T) => boolean, updater: (item: T) => T) => {
    setArray(prev => prev.map(item => predicate(item) ? updater(item) : item));
  };

  const clearArray = () => {
    setArray([]);
  };

  const findItem = (predicate: (item: T) => boolean): T | undefined => {
    return array.find(predicate);
  };

  return {
    items: array,
    addItem,
    removeItem,
    updateItem,
    clearArray,
    findItem,
    setItems: setArray,
  };
}
