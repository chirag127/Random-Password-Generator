import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  description,
  className,
  disabled = false,
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={cn('flex items-start space-x-3', className)}>
      <div className="flex items-center h-5">
        <button
          type="button"
          onClick={handleChange}
          disabled={disabled}
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            checked
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600',
            disabled
              ? 'opacity-50 cursor-not-allowed'
              : 'cursor-pointer hover:border-blue-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          )}
        >
          {checked && <Check className="w-3 h-3" />}
        </button>
      </div>
      <div className="flex-1">
        <label
          onClick={handleChange}
          className={cn(
            'text-sm font-medium text-gray-700 dark:text-gray-300',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export { Checkbox };
