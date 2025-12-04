import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration for Pet Name Generator
 *
 * This configuration:
 * - Runs tests against Docker Compose services (frontend: 3000, backend: 4000)
 * - Tests across 3 browsers (Chromium, Firefox, WebKit) as required
 * - Uses moderate timeouts for UI interactions
 * - Generates comprehensive reports
 */
export default defineConfig({
  // Test directory
  testDir: './specs',

  // Test files pattern
  testMatch: '**/*.spec.ts',

  // Run tests in parallel across files (but serial within a file by default)
  fullyParallel: true,

  // Fail the build on CI if tests were accidentally left in .only mode
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Limit workers on CI, use all cores locally
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'], // Console output during test run
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // Global timeout for each test
  timeout: 30000, // 30 seconds per test

  // Expect timeout for assertions
  expect: {
    timeout: 5000, // 5 seconds for expect() assertions
  },

  // Shared settings for all projects
  use: {
    // Base URL for all page.goto() calls
    baseURL: 'http://localhost:3000',

    // Collect trace on first retry for debugging
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Navigation timeout
    navigationTimeout: 10000,

    // Action timeout (click, fill, etc.)
    actionTimeout: 5000,
  },

  // Multi-browser testing (required by assignment)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Web server configuration - CRITICAL for Docker Compose integration
  webServer: {
    // Check if Docker Compose services are running
    // This just verifies services are up - doesn't start them
    command: 'echo "Checking if services are running..."',
    url: 'http://localhost:3000',
    reuseExistingServer: true, // Don't start if already running
    timeout: 120000, // 2 minutes to allow Docker Compose to start
  },
});
