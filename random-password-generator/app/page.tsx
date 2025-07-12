'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { PasswordDisplay } from '@/components/PasswordDisplay';
import { SettingsPanel, PasswordSettings } from '@/components/SettingsPanel';
import { StrengthIndicator } from '@/components/StrengthIndicator';
import { SavedPasswordsList, SavedPassword } from '@/components/SavedPasswordsList';
import { useLocalStorageArray } from '@/hooks/useLocalStorage';
import { usePasswordStrength } from '@/hooks/usePasswordStrength';
import { generatePassword } from '@/lib/password';

const DEFAULT_SETTINGS: PasswordSettings = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: false,
};

export default function Home() {
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState<PasswordSettings>(DEFAULT_SETTINGS);
  const [isGenerating, setIsGenerating] = useState(false);

  // Local storage for saved passwords
  const {
    items: savedPasswords,
    addItem: addSavedPassword,
    removeItem: removeSavedPassword,
    clearArray: clearSavedPasswords,
  } = useLocalStorageArray<SavedPassword>('savedPasswords', []);

  // Password strength analysis
  const strengthResult = usePasswordStrength(password);

  // Generate initial password on component mount
  useEffect(() => {
    handleGenerate();
  }, []);

  // Auto-generate when settings change
  useEffect(() => {
    if (password) {
      handleGenerate();
    }
  }, [settings]);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 100));

      const newPassword = generatePassword(settings);
      setPassword(newPassword);
    } catch (error) {
      console.error('Error generating password:', error);
      toast.error('Failed to generate password. Please check your settings.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    toast.success('Password copied to clipboard!');
  };

  const handleSave = () => {
    if (!password) return;

    const newSavedPassword: SavedPassword = {
      id: Date.now().toString(),
      value: password,
      createdAt: new Date(),
    };

    addSavedPassword(newSavedPassword);
    toast.success('Password saved successfully!');
  };

  const handleDeleteSaved = (id: string) => {
    removeSavedPassword(item => item.id === id);
    toast.success('Password deleted!');
  };

  const handleClearAll = () => {
    clearSavedPasswords();
    toast.success('All saved passwords cleared!');
  };

  const handleCopySaved = () => {
    toast.success('Password copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Random Password Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate secure, customizable passwords with advanced options.
            All operations are performed client-side for maximum privacy and security.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Password Display and Settings - Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Password Display */}
              <PasswordDisplay
                password={password}
                onGenerate={handleGenerate}
                onSave={handleSave}
                onCopy={handleCopy}
                isGenerating={isGenerating}
              />

              {/* Password Strength Indicator */}
              {password && strengthResult && (
                <StrengthIndicator
                  score={strengthResult.score}
                  feedback={strengthResult.feedback}
                />
              )}

              {/* Settings Panel */}
              <SettingsPanel
                settings={settings}
                onSettingsChange={setSettings}
              />
            </div>

            {/* Saved Passwords - Side Column */}
            <div className="lg:col-span-1">
              <SavedPasswordsList
                passwords={savedPasswords}
                onCopy={handleCopySaved}
                onDelete={handleDeleteSaved}
                onClearAll={handleClearAll}
              />
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p>
            Built with Next.js and Tailwind CSS by{' '}
            <a
              href="https://github.com/chirag127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Chirag Singhal
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
