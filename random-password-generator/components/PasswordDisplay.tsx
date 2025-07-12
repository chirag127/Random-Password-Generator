'use client';

import React, { useState } from 'react';
import { Copy, RefreshCw, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface PasswordDisplayProps {
  password: string;
  onGenerate: () => void;
  onSave: () => void;
  onCopy: () => void;
  isGenerating?: boolean;
  className?: string;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  onGenerate,
  onSave,
  onCopy,
  isGenerating = false,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      onCopy();
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const displayPassword = showPassword ? password : '•'.repeat(password.length);

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Generated Password
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePasswordVisibility}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-200 dark:border-gray-600">
          {password ? (
            <div className="font-mono text-lg break-all text-gray-900 dark:text-white">
              {displayPassword}
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center italic">
              Click "Generate" to create a password
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onGenerate}
          disabled={isGenerating}
          className="flex-1 sm:flex-none"
        >
          <RefreshCw className={cn('w-4 h-4 mr-2', isGenerating && 'animate-spin')} />
          {isGenerating ? 'Generating...' : 'Generate'}
        </Button>

        <Button
          variant="secondary"
          onClick={handleCopy}
          disabled={!password}
          className="flex-1 sm:flex-none"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copySuccess ? 'Copied!' : 'Copy'}
        </Button>

        <Button
          variant="outline"
          onClick={onSave}
          disabled={!password}
          className="flex-1 sm:flex-none"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      {password && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Length:</span> {password.length} characters
        </div>
      )}
    </div>
  );
};

export { PasswordDisplay };
