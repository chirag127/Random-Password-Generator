'use client';

import React from 'react';
import { Slider } from './ui/Slider';
import { Checkbox } from './ui/Checkbox';
import { Switch } from './ui/Switch';
import { cn } from '@/lib/utils';

export interface PasswordSettings {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}

interface SettingsPanelProps {
  settings: PasswordSettings;
  onSettingsChange: (settings: PasswordSettings) => void;
  className?: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  className,
}) => {
  const updateSetting = <K extends keyof PasswordSettings>(
    key: K,
    value: PasswordSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const hasAtLeastOneCharacterType = 
    settings.includeUppercase ||
    settings.includeLowercase ||
    settings.includeNumbers ||
    settings.includeSymbols;

  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6', className)}>
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Password Settings
      </h2>

      <div className="space-y-6">
        {/* Length Slider */}
        <div>
          <Slider
            label="Password Length"
            value={settings.length}
            onChange={(value) => updateSetting('length', value)}
            min={8}
            max={128}
            step={1}
            showValue={true}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Recommended: 12+ characters for strong security
          </p>
        </div>

        {/* Character Types */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Character Types
          </h3>
          <div className="space-y-3">
            <Checkbox
              checked={settings.includeUppercase}
              onChange={(checked) => updateSetting('includeUppercase', checked)}
              label="Uppercase Letters (A-Z)"
              description="Include capital letters in the password"
            />
            <Checkbox
              checked={settings.includeLowercase}
              onChange={(checked) => updateSetting('includeLowercase', checked)}
              label="Lowercase Letters (a-z)"
              description="Include lowercase letters in the password"
            />
            <Checkbox
              checked={settings.includeNumbers}
              onChange={(checked) => updateSetting('includeNumbers', checked)}
              label="Numbers (0-9)"
              description="Include numeric digits in the password"
            />
            <Checkbox
              checked={settings.includeSymbols}
              onChange={(checked) => updateSetting('includeSymbols', checked)}
              label="Symbols (!@#$%^&*)"
              description="Include special characters and symbols"
            />
          </div>
          
          {!hasAtLeastOneCharacterType && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                ⚠️ Please select at least one character type to generate a password.
              </p>
            </div>
          )}
        </div>

        {/* Advanced Options */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Advanced Options
          </h3>
          <Switch
            checked={settings.excludeAmbiguous}
            onChange={(checked) => updateSetting('excludeAmbiguous', checked)}
            label="Exclude Ambiguous Characters"
            description="Exclude characters that look similar (I, l, 1, O, 0)"
          />
        </div>

        {/* Settings Summary */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Current Settings Summary
          </h3>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <p>Length: {settings.length} characters</p>
            <p>
              Character types: {[
                settings.includeUppercase && 'Uppercase',
                settings.includeLowercase && 'Lowercase', 
                settings.includeNumbers && 'Numbers',
                settings.includeSymbols && 'Symbols'
              ].filter(Boolean).join(', ') || 'None selected'}
            </p>
            <p>
              Ambiguous characters: {settings.excludeAmbiguous ? 'Excluded' : 'Included'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SettingsPanel };
