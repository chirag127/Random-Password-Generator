'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StrengthIndicatorProps {
  score: number; // 0-4 scale from zxcvbn
  feedback?: {
    warning?: string;
    suggestions?: string[];
  };
  className?: string;
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({
  score,
  feedback,
  className,
}) => {
  const getStrengthLabel = (score: number): string => {
    switch (score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Unknown';
    }
  };

  const getStrengthColor = (score: number): string => {
    switch (score) {
      case 0:
        return 'bg-red-500';
      case 1:
        return 'bg-orange-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getTextColor = (score: number): string => {
    switch (score) {
      case 0:
        return 'text-red-600 dark:text-red-400';
      case 1:
        return 'text-orange-600 dark:text-orange-400';
      case 2:
        return 'text-yellow-600 dark:text-yellow-400';
      case 3:
        return 'text-blue-600 dark:text-blue-400';
      case 4:
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const strengthLabel = getStrengthLabel(score);
  const strengthColor = getStrengthColor(score);
  const textColor = getTextColor(score);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password Strength
        </span>
        <span className={cn('text-sm font-semibold', textColor)}>
          {strengthLabel}
        </span>
      </div>

      {/* Strength Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300 ease-in-out',
            strengthColor
          )}
          style={{ width: `${((score + 1) / 5) * 100}%` }}
        />
      </div>

      {/* Strength Indicators */}
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              'flex-1 h-1 rounded-full transition-colors duration-300',
              level <= score ? strengthColor : 'bg-gray-200 dark:bg-gray-700'
            )}
          />
        ))}
      </div>

      {/* Feedback */}
      {feedback && (feedback.warning || feedback.suggestions?.length) && (
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          {feedback.warning && (
            <p className="text-sm text-orange-600 dark:text-orange-400 mb-2">
              ⚠️ {feedback.warning}
            </p>
          )}
          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Suggestions:
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { StrengthIndicator };
