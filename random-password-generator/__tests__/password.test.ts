import { generatePassword, calculatePasswordEntropy, getPasswordStrengthDescription } from '@/lib/password';
import { PasswordSettings } from '@/components/SettingsPanel';

describe('Password Generation', () => {
  const defaultSettings: PasswordSettings = {
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeAmbiguous: false,
  };

  describe('generatePassword', () => {
    it('should generate a password of the specified length', () => {
      const password = generatePassword({ ...defaultSettings, length: 16 });
      expect(password).toHaveLength(16);
    });

    it('should include uppercase letters when specified', () => {
      const password = generatePassword({
        ...defaultSettings,
        includeUppercase: true,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
      });
      expect(password).toMatch(/^[A-Z]+$/);
    });

    it('should include lowercase letters when specified', () => {
      const password = generatePassword({
        ...defaultSettings,
        includeUppercase: false,
        includeLowercase: true,
        includeNumbers: false,
        includeSymbols: false,
      });
      expect(password).toMatch(/^[a-z]+$/);
    });

    it('should include numbers when specified', () => {
      const password = generatePassword({
        ...defaultSettings,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: true,
        includeSymbols: false,
      });
      expect(password).toMatch(/^[0-9]+$/);
    });

    it('should include symbols when specified', () => {
      const password = generatePassword({
        ...defaultSettings,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: true,
      });
      expect(password).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
    });

    it('should exclude ambiguous characters when specified', () => {
      const password = generatePassword({
        ...defaultSettings,
        excludeAmbiguous: true,
      });
      expect(password).not.toMatch(/[Il1O0]/);
    });

    it('should throw error when no character types are selected', () => {
      expect(() => {
        generatePassword({
          ...defaultSettings,
          includeUppercase: false,
          includeLowercase: false,
          includeNumbers: false,
          includeSymbols: false,
        });
      }).toThrow('No character types selected for password generation');
    });

    it('should generate different passwords on multiple calls', () => {
      const password1 = generatePassword(defaultSettings);
      const password2 = generatePassword(defaultSettings);
      // While theoretically possible to be the same, it's extremely unlikely
      expect(password1).not.toBe(password2);
    });

    it('should handle minimum length passwords', () => {
      const password = generatePassword({ ...defaultSettings, length: 1 });
      expect(password).toHaveLength(1);
    });

    it('should handle maximum length passwords', () => {
      const password = generatePassword({ ...defaultSettings, length: 128 });
      expect(password).toHaveLength(128);
    });
  });

  describe('calculatePasswordEntropy', () => {
    it('should return 0 for empty password', () => {
      expect(calculatePasswordEntropy('')).toBe(0);
    });

    it('should calculate entropy for simple passwords', () => {
      const entropy = calculatePasswordEntropy('abc');
      expect(entropy).toBeGreaterThan(0);
    });

    it('should return higher entropy for complex passwords', () => {
      const simpleEntropy = calculatePasswordEntropy('abc');
      const complexEntropy = calculatePasswordEntropy('Abc123!@#');
      expect(complexEntropy).toBeGreaterThan(simpleEntropy);
    });

    it('should return higher entropy for longer passwords', () => {
      const shortEntropy = calculatePasswordEntropy('Abc1!');
      const longEntropy = calculatePasswordEntropy('Abc123!@#$%^&*()');
      expect(longEntropy).toBeGreaterThan(shortEntropy);
    });
  });

  describe('getPasswordStrengthDescription', () => {
    it('should return "Very Weak" for very low entropy', () => {
      expect(getPasswordStrengthDescription(10)).toBe('Very Weak');
    });

    it('should return "Weak" for low entropy', () => {
      expect(getPasswordStrengthDescription(40)).toBe('Weak');
    });

    it('should return "Fair" for medium entropy', () => {
      expect(getPasswordStrengthDescription(60)).toBe('Fair');
    });

    it('should return "Good" for high entropy', () => {
      expect(getPasswordStrengthDescription(80)).toBe('Good');
    });

    it('should return "Strong" for very high entropy', () => {
      expect(getPasswordStrengthDescription(100)).toBe('Strong');
    });
  });
});
