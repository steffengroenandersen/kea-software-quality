# E2E Tests - Pet Name Generator

End-to-End UI tests for the Pet Name Generator application using Playwright with TypeScript.

## Overview

This test suite implements comprehensive E2E testing for all 4 user stories using:
- **Playwright** - Modern E2E testing framework
- **TypeScript** - Type-safe test code
- **Page Object Model** - Maintainable test structure
- **Multi-browser Testing** - Chromium, Firefox, WebKit

## Project Structure

```
task-8-end-to-end-ui-testing/
├── specs/                          # Test specification files
│   └── user-story-1-generate-single-name.spec.ts
├── page-objects/                   # Page Object Model pattern
│   └── GeneratePage.ts
├── fixtures/                       # Shared test data and API helpers
│   ├── test-data.ts
│   └── api-helpers.ts
├── utils/                          # Common utilities
│   └── test-helpers.ts
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── tsconfig.json                   # TypeScript configuration
```

## Prerequisites

1. **Docker Compose** - Services must be running
2. **Node.js 20.x** - For running tests

## Installation

```bash
# Navigate to E2E test directory
cd task-8-end-to-end-ui-testing

# Install dependencies
npm install

# Install Playwright browsers
npm run install-browsers
```

## Running Tests

### Ensure Docker Services Are Running

```bash
# From project root
cd application
docker-compose up -d
docker-compose ps  # Verify all services are running
```

### Run Tests

```bash
# From task-8 directory
cd task-8-end-to-end-ui-testing

# Run all tests (all browsers)
npm test

# Run on specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (see browser)
npm run test:headed

# Run in debug mode (step through tests)
npm run test:debug

# Run in UI mode (interactive)
npm run test:ui

# Run specific user story
npm run test:user-story-1

# View HTML report after running
npm run report
```

## Test Structure

### Example Test (User Story 1)

The test spec `user-story-1-generate-single-name.spec.ts` demonstrates:

1. **AAA Pattern** - Arrange, Act, Assert sections clearly marked
2. **Page Object Model** - Locators and actions separated from tests
3. **Describe Blocks** - Tests organized by scenario type
4. **Moderate Comments** - Key sections explained without over-commenting

### Test Categories

Each test spec includes:
- **Happy Path Scenarios** - Core functionality works as expected
- **UI Interaction Tests** - UI behavior and responsiveness
- **Error Scenarios** - Graceful error handling
- **Cross-Browser Compatibility** - Works on all browsers
- **Basic Accessibility** - Meets basic accessibility requirements

## Page Object Model

Benefits:
- **Single source of truth** for locators
- **Reusable methods** across tests
- **Easy maintenance** when UI changes
- **Tests focus on WHAT not HOW**

Example:
```typescript
// In test
await generatePage.clickGenerateButton();
await generatePage.expectNameToBeDisplayed();

// Locators and waits handled in page object
```

## Extending to Other User Stories

To add tests for User Stories 2-4:

1. Create page object in `page-objects/`
2. Create test spec in `specs/`
3. Follow the same structure as User Story 1
4. Use fixtures from `fixtures/test-data.ts`

## CI/CD Integration

To add E2E tests to GitHub Actions:

```yaml
e2e-tests:
  name: E2E Tests
  runs-on: ubuntu-latest
  steps:
    - Checkout code
    - Setup Node.js
    - Start Docker Compose services
    - Wait for health checks
    - Install E2E dependencies
    - Run: npm test
    - Upload test report artifact
```

## Troubleshooting

### Tests failing with "Target page, context or browser has been closed"
- Ensure Docker services are running: `docker-compose ps`
- Check frontend is accessible: `curl http://localhost:3000`
- Check backend is healthy: `curl http://localhost:4000/health`

### "Test timeout of 30000ms exceeded"
- Increase timeout in `playwright.config.ts`
- Check if services are slow to respond
- Try running tests individually: `npm run test:user-story-1`

### "No tests found"
- Ensure you're in `tests/e2e/` directory
- Check test files end with `.spec.ts`
- Verify `testMatch` pattern in `playwright.config.ts`

## Test Reports

After running tests:
- **HTML Report**: `playwright-report/index.html` - Open with `npm run report`
- **JSON Results**: `test-results/results.json` - For CI/CD parsing
- **Screenshots**: Only on failure, in `test-results/`
- **Videos**: Only on failure, in `test-results/`

## Best Practices

1. **Always use Page Objects** - Don't access locators directly in tests
2. **Wait for elements** - Use Playwright's auto-waiting, avoid hard timeouts
3. **Test both happy and sad paths** - Don't just test success cases
4. **Use meaningful test names** - Start with "should"
5. **Keep tests independent** - Each test should run in isolation
6. **Clean up after tests** - Use beforeEach/afterEach for setup/teardown

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
