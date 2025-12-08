// Global test configuration
// Runs before each test file

// Note: jest is available globally in the test environment
// No need to configure jest.setTimeout here as it's set in jest.config.js (testTimeout: 10000)

// Mock console methods to reduce noise (optional)
// Uncomment the lines below to silence console during tests
/*
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
*/
