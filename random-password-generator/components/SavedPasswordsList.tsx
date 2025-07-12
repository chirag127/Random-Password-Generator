'use client';

import React, { useState } from 'react';
import { Copy, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

export interface SavedPassword {
  id: string;
  value: string;
  createdAt: Date;
}

interface SavedPasswordsListProps {
  passwords: SavedPassword[];
  onCopy: (password: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  className?: string;
}

const SavedPasswordsList: React.FC<SavedPasswordsListProps> = ({
  passwords,
  onCopy,
  onDelete,
  onClearAll,
  className,
}) => {
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const togglePasswordVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisiblePasswords(newVisible);
  };

  const handleCopy = async (password: string, id: string) => {
    try {
      await navigator.clipboard.writeText(password);
      onCopy(password);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncatePassword = (password: string, maxLength: number = 20): string => {
    if (password.length <= maxLength) return password;
    return password.substring(0, maxLength) + '...';
  };

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Saved Passwords
        </h2>
        {passwords.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {passwords.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No saved passwords yet.
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Generate a password and click "Save" to store it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {passwords.map((password) => {
            const isVisible = visiblePasswords.has(password.id);
            const isCopied = copiedId === password.id;
            const displayPassword = isVisible 
              ? password.value 
              : '•'.repeat(Math.min(password.value.length, 20));

            return (
              <div
                key={password.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(password.createdAt)}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {password.value.length} chars
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => togglePasswordVisibility(password.id)}
                      className="h-6 w-6"
                      title={isVisible ? 'Hide password' : 'Show password'}
                    >
                      {isVisible ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(password.value, password.id)}
                      className="h-6 w-6"
                      title="Copy password"
                    >
                      <Copy className={cn('w-3 h-3', isCopied && 'text-green-600')} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(password.id)}
                      className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      title="Delete password"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                  {isVisible ? password.value : truncatePassword(displayPassword)}
                </div>
                {isCopied && (
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ✓ Copied to clipboard
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {passwords.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {passwords.length} password{passwords.length !== 1 ? 's' : ''} saved locally
          </p>
        </div>
      )}
    </div>
  );
};

export { SavedPasswordsList };
