// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Mock crypto.getRandomValues for testing
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: jest.fn((arr) => {
      // Create a predictable sequence for testing
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 0xFFFFFFFF);
      }
      return arr;
    }),
  },
});

// Mock navigator.clipboard for testing
Object.defineProperty(global.navigator, 'clipboard', {
  value: {
    writeText: jest.fn(() => Promise.resolve()),
  },
  writable: true,
});
