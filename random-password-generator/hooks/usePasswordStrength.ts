'use client';

import { useState, useEffect } from 'react';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';

// Initialize zxcvbn options
const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export interface PasswordStrengthResult {
  score: number; // 0-4
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crackTimesDisplay: {
    onlineThrottling100PerHour: string;
    onlineNoThrottling10PerSecond: string;
    offlineSlowHashing1e4PerSecond: string;
    offlineFastHashing1e10PerSecond: string;
  };
  entropy: number;
}

/**
 * Hook for analyzing password strength using zxcvbn
 * @param password - Password to analyze
 * @returns Password strength analysis result
 */
export function usePasswordStrength(password: string): PasswordStrengthResult | null {
  const [result, setResult] = useState<PasswordStrengthResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!password) {
      setResult(null);
      return;
    }

    setIsLoading(true);

    // Debounce the analysis to avoid excessive calculations
    const timeoutId = setTimeout(() => {
      try {
        const analysis = zxcvbn(password);
        
        setResult({
          score: analysis.score,
          feedback: {
            warning: analysis.feedback.warning || '',
            suggestions: analysis.feedback.suggestions || [],
          },
          crackTimesDisplay: {
            onlineThrottling100PerHour: analysis.crackTimesDisplay.onlineThrottling100PerHour,
            onlineNoThrottling10PerSecond: analysis.crackTimesDisplay.onlineNoThrottling10PerSecond,
            offlineSlowHashing1e4PerSecond: analysis.crackTimesDisplay.offlineSlowHashing1e4PerSecond,
            offlineFastHashing1e10PerSecond: analysis.crackTimesDisplay.offlineFastHashing1e10PerSecond,
          },
          entropy: analysis.guessesLog10 * Math.log10(2), // Convert to bits
        });
      } catch (error) {
        console.error('Error analyzing password strength:', error);
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [password]);

  return result;
}

/**
 * Hook for getting a simplified password strength score
 * @param password - Password to analyze
 * @returns Simplified strength score (0-4) and loading state
 */
export function usePasswordScore(password: string): { score: number; isLoading: boolean } {
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!password) {
      setScore(0);
      return;
    }

    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      try {
        const analysis = zxcvbn(password);
        setScore(analysis.score);
      } catch (error) {
        console.error('Error calculating password score:', error);
        setScore(0);
      } finally {
        setIsLoading(false);
      }
    }, 100); // Shorter debounce for score only

    return () => clearTimeout(timeoutId);
  }, [password]);

  return { score, isLoading };
}
