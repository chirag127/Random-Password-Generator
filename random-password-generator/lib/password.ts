import { PasswordSettings } from '@/components/SettingsPanel';

// Character sets for password generation
const CHARACTER_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

// Ambiguous characters that can be confused with each other
const AMBIGUOUS_CHARS = 'Il1O0';

/**
 * Generates a cryptographically secure random password based on the provided settings
 * @param settings - Password generation settings
 * @returns Generated password string
 */
export function generatePassword(settings: PasswordSettings): string {
  // Build character set based on settings
  let characterSet = '';
  
  if (settings.includeUppercase) {
    characterSet += CHARACTER_SETS.uppercase;
  }
  
  if (settings.includeLowercase) {
    characterSet += CHARACTER_SETS.lowercase;
  }
  
  if (settings.includeNumbers) {
    characterSet += CHARACTER_SETS.numbers;
  }
  
  if (settings.includeSymbols) {
    characterSet += CHARACTER_SETS.symbols;
  }

  // Remove ambiguous characters if requested
  if (settings.excludeAmbiguous) {
    characterSet = characterSet
      .split('')
      .filter(char => !AMBIGUOUS_CHARS.includes(char))
      .join('');
  }

  // Validate that we have characters to work with
  if (characterSet.length === 0) {
    throw new Error('No character types selected for password generation');
  }

  // Generate password using cryptographically secure random values
  const password = Array.from(
    { length: settings.length },
    () => {
      const randomIndex = getSecureRandomInt(characterSet.length);
      return characterSet[randomIndex];
    }
  ).join('');

  // Ensure password meets minimum requirements
  if (!validatePasswordRequirements(password, settings)) {
    // If password doesn't meet requirements, try again (recursive with limit)
    return generatePasswordWithRetry(settings, 0);
  }

  return password;
}

/**
 * Generates a password with retry logic to ensure requirements are met
 * @param settings - Password generation settings
 * @param retryCount - Current retry attempt
 * @returns Generated password string
 */
function generatePasswordWithRetry(settings: PasswordSettings, retryCount: number): string {
  const maxRetries = 10;
  
  if (retryCount >= maxRetries) {
    // If we've tried too many times, fall back to a guaranteed method
    return generatePasswordGuaranteed(settings);
  }

  const password = generatePassword(settings);
  
  if (validatePasswordRequirements(password, settings)) {
    return password;
  }
  
  return generatePasswordWithRetry(settings, retryCount + 1);
}

/**
 * Generates a password that is guaranteed to meet requirements
 * @param settings - Password generation settings
 * @returns Generated password string
 */
function generatePasswordGuaranteed(settings: PasswordSettings): string {
  const requiredChars: string[] = [];
  const availableChars: string[] = [];

  // Add at least one character from each required type
  if (settings.includeUppercase) {
    const chars = settings.excludeAmbiguous 
      ? CHARACTER_SETS.uppercase.split('').filter(c => !AMBIGUOUS_CHARS.includes(c))
      : CHARACTER_SETS.uppercase.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
    availableChars.push(...chars);
  }

  if (settings.includeLowercase) {
    const chars = settings.excludeAmbiguous 
      ? CHARACTER_SETS.lowercase.split('').filter(c => !AMBIGUOUS_CHARS.includes(c))
      : CHARACTER_SETS.lowercase.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
    availableChars.push(...chars);
  }

  if (settings.includeNumbers) {
    const chars = settings.excludeAmbiguous 
      ? CHARACTER_SETS.numbers.split('').filter(c => !AMBIGUOUS_CHARS.includes(c))
      : CHARACTER_SETS.numbers.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
    availableChars.push(...chars);
  }

  if (settings.includeSymbols) {
    const chars = CHARACTER_SETS.symbols.split('');
    requiredChars.push(chars[getSecureRandomInt(chars.length)]);
    availableChars.push(...chars);
  }

  // Fill remaining length with random characters
  const remainingLength = settings.length - requiredChars.length;
  const randomChars = Array.from(
    { length: remainingLength },
    () => availableChars[getSecureRandomInt(availableChars.length)]
  );

  // Combine and shuffle
  const allChars = [...requiredChars, ...randomChars];
  return shuffleArray(allChars).join('');
}

/**
 * Validates that a password meets the specified requirements
 * @param password - Password to validate
 * @param settings - Password generation settings
 * @returns True if password meets requirements
 */
function validatePasswordRequirements(password: string, settings: PasswordSettings): boolean {
  if (settings.includeUppercase && !/[A-Z]/.test(password)) {
    return false;
  }
  
  if (settings.includeLowercase && !/[a-z]/.test(password)) {
    return false;
  }
  
  if (settings.includeNumbers && !/[0-9]/.test(password)) {
    return false;
  }
  
  if (settings.includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
    return false;
  }

  return true;
}

/**
 * Generates a cryptographically secure random integer between 0 and max (exclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random integer
 */
function getSecureRandomInt(max: number): number {
  if (max <= 0) {
    throw new Error('Max value must be greater than 0');
  }

  // Use crypto.getRandomValues for cryptographically secure randomness
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  
  // Use rejection sampling to avoid modulo bias
  const randomValue = array[0];
  const maxValidValue = Math.floor(0xFFFFFFFF / max) * max;
  
  if (randomValue >= maxValidValue) {
    // Reject and try again to avoid bias
    return getSecureRandomInt(max);
  }
  
  return randomValue % max;
}

/**
 * Shuffles an array using the Fisher-Yates algorithm with secure randomness
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Estimates the entropy of a password based on its character set and length
 * @param password - Password to analyze
 * @returns Entropy in bits
 */
export function calculatePasswordEntropy(password: string): number {
  if (!password) return 0;

  let charsetSize = 0;
  
  // Determine character set size
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // Approximate symbol count
  
  // Entropy = log2(charsetSize^length)
  return Math.log2(Math.pow(charsetSize, password.length));
}

/**
 * Gets a human-readable description of password strength based on entropy
 * @param entropy - Password entropy in bits
 * @returns Strength description
 */
export function getPasswordStrengthDescription(entropy: number): string {
  if (entropy < 30) return 'Very Weak';
  if (entropy < 50) return 'Weak';
  if (entropy < 70) return 'Fair';
  if (entropy < 90) return 'Good';
  return 'Strong';
}
