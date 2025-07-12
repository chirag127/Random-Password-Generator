import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names with clsx
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
