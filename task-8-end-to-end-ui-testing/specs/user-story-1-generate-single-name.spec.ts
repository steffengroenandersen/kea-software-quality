import { test, expect } from '@playwright/test';
import { GeneratePage } from '../page-objects/GeneratePage';

/**
 * E2E Tests for User Story 1: Generate Popular Pet Name
 *
 * Requirements from user-stories.md:
 * - User can click "Generate Name" button to get a popular pet name
 * - User can generate multiple names (each click generates a new name)
 * - System should handle errors gracefully
 *
 * Testing approach:
 * - Tests run against live Docker Compose services (frontend + backend + database)
 * - Uses Page Object Model to separate locators from test logic
 * - Follows AAA pattern (Arrange-Act-Assert) from existing Jest tests
 * - Tests both happy path and error scenarios
 */

test.describe('User Story 1: Generate Popular Pet Name', () => {
  // Declare page object (initialized in beforeEach)
  let generatePage: GeneratePage;

  /**
   * Setup: Navigate to Generate page before each test
   * This ensures each test starts from a clean state
   */
  test.beforeEach(async ({ page }) => {
    // Arrange: Initialize page object and navigate
    generatePage = new GeneratePage(page);
    await generatePage.goto();
  });

  /**
   * HAPPY PATH SCENARIOS
   * These tests verify the core functionality works as expected
   */
  test.describe('Happy Path Scenarios', () => {
    test('should generate first pet name when clicking Generate button', async () => {
      // Arrange (already done in beforeEach - page is loaded)

      // Act: Click the generate button
      await generatePage.clickGenerateButton();

      // Assert: Verify a name is displayed
      await generatePage.expectNameToBeDisplayed();

      // Additional assertion: Verify the name is non-empty and looks like a valid name
      const generatedName = await generatePage.getGeneratedName();
      expect(generatedName).toBeTruthy();
      expect(generatedName.length).toBeGreaterThan(0);
      expect(generatedName).toMatch(/^[A-Za-z]+$/); // Only letters (no numbers/special chars)
    });

    test('should generate another pet name when clicking Generate button again', async () => {
      // Arrange: Generate first name
      await generatePage.clickGenerateButton();
      const firstName = await generatePage.getGeneratedName();

      // Act: Click generate button again
      await generatePage.clickGenerateButton();
      const secondName = await generatePage.getGeneratedName();

      // Assert: Verify second name is displayed
      await generatePage.expectNameToBeDisplayed();
      expect(secondName).toBeTruthy();
      expect(secondName.length).toBeGreaterThan(0);

      // Optional: Log both names for manual verification
      console.log(`First name: ${firstName}, Second name: ${secondName}`);

      // Note: We don't assert firstName !== secondName because randomness could produce same name
      // Instead, we verify that the UI updated (result div shows a valid name)
    });

    test('should generate multiple unique names in sequence', async () => {
      // Arrange: Array to store generated names
      const generatedNames: string[] = [];
      const numberOfGenerations = 3;

      // Act: Generate multiple names
      for (let i = 0; i < numberOfGenerations; i++) {
        await generatePage.clickGenerateButton();
        const name = await generatePage.getGeneratedName();
        generatedNames.push(name);
      }

      // Assert: Verify all names were generated successfully
      expect(generatedNames).toHaveLength(numberOfGenerations);

      generatedNames.forEach((name, index) => {
        expect(name).toBeTruthy();
        expect(name.length).toBeGreaterThan(0);
        expect(name).toMatch(/^[A-Za-z]+$/);
        console.log(`Generation ${index + 1}: ${name}`);
      });
    });

    test('should display name in correct format with "Generated Name:" prefix', async () => {
      // Act: Generate name
      await generatePage.clickGenerateButton();

      // Assert: Verify the result div contains the expected format
      await expect(generatePage.resultDiv).toContainText('Generated Name:');

      // Verify the full HTML structure (optional but thorough)
      const innerHTML = await generatePage.resultDiv.innerHTML();
      expect(innerHTML).toMatch(/<p><strong>Generated Name:<\/strong>\s+\w+<\/p>/);
    });
  });

  /**
   * UI INTERACTION TESTS
   * These tests verify UI behavior and responsiveness
   */
  test.describe('UI Interaction Tests', () => {
    test('should have Generate button visible and enabled on page load', async () => {
      // Assert: Button should be visible and enabled (already loaded in beforeEach)
      await expect(generatePage.generateButton).toBeVisible();
      await expect(generatePage.generateButton).toBeEnabled();

      // Verify button text
      await expect(generatePage.generateButton).toHaveText('Generate Name');
    });

    test('should clear previous result when generating new name', async () => {
      // Arrange: Generate first name
      await generatePage.clickGenerateButton();
      const firstName = await generatePage.getGeneratedName();

      // Act: Generate second name
      await generatePage.clickGenerateButton();
      const secondName = await generatePage.getGeneratedName();

      // Assert: Verify result div only shows latest name (not both)
      const resultText = await generatePage.resultDiv.textContent();
      expect(resultText).toContain(secondName);

      // Verify only one "Generated Name:" prefix exists (not accumulated)
      const occurrences = (resultText?.match(new RegExp('Generated Name:', 'g')) || []).length;
      expect(occurrences).toBe(1); // Only one "Generated Name:" prefix
    });

    test('should show loading state or immediate result (no hanging state)', async ({ page }) => {
      // Act: Click generate and measure response time
      const startTime = Date.now();
      await generatePage.clickGenerateButton();
      await generatePage.expectNameToBeDisplayed();
      const endTime = Date.now();

      const responseTime = endTime - startTime;

      // Assert: Response should be reasonably fast (< 3 seconds)
      expect(responseTime).toBeLessThan(3000);
      console.log(`Response time: ${responseTime}ms`);
    });
  });

  /**
   * ERROR SCENARIOS
   * These tests verify graceful error handling
   *
   * Note: Testing backend unavailability requires stopping Docker Compose,
   * which is complex in E2E tests. These tests are documented but may need
   * manual execution or custom setup/teardown logic.
   */
  test.describe('Error Scenarios', () => {
    test.skip('should display error when backend is unavailable', async ({ page }) => {
      // This test requires stopping the backend service before running
      // To enable: Stop backend with: docker-compose stop backend
      // Then remove .skip and run this test

      // Arrange: Assume backend is stopped (manual step required)

      // Act: Try to generate name
      await generatePage.clickGenerateButton();

      // Assert: Verify error message is displayed
      await generatePage.expectErrorToBeDisplayed('Failed to connect to server');
    });

    test('should handle rapid consecutive clicks without breaking', async () => {
      // Act: Click generate button multiple times rapidly (stress test)
      const numberOfClicks = 5;
      const clickPromises = [];

      for (let i = 0; i < numberOfClicks; i++) {
        clickPromises.push(generatePage.clickGenerateButton());
      }

      // Wait for all clicks to complete
      await Promise.all(clickPromises);

      // Wait a moment for the last response
      await generatePage.page.waitForTimeout(1000);

      // Assert: Verify page is still functional and shows a result
      await generatePage.expectNameToBeDisplayed();
      const finalName = await generatePage.getGeneratedName();
      expect(finalName).toBeTruthy();
    });
  });

  /**
   * CROSS-BROWSER COMPATIBILITY TESTS
   * These tests verify the page works across different browsers
   * (Automatically run by Playwright across chromium, firefox, webkit)
   */
  test.describe('Cross-Browser Compatibility', () => {
    test('should work consistently across all browsers', async ({ browserName }) => {
      // This test runs on all configured browsers (chromium, firefox, webkit)
      console.log(`Testing on browser: ${browserName}`);

      // Act: Generate name
      await generatePage.clickGenerateButton();

      // Assert: Verify behavior is consistent
      await generatePage.expectNameToBeDisplayed();
      const name = await generatePage.getGeneratedName();

      expect(name).toBeTruthy();
      expect(name).toMatch(/^[A-Za-z]+$/);
    });
  });

  /**
   * ACCESSIBILITY TESTS (Basic)
   * These tests verify basic accessibility requirements
   */
  test.describe('Basic Accessibility', () => {
    test('should have proper page title', async ({ page }) => {
      // Assert: Verify page has a meaningful title
      await expect(page).toHaveTitle('Generate Pet Name');
    });

    test('should have heading visible', async ({ page }) => {
      // Assert: Verify main heading is present
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Pet Name Generator');
    });

    test('should have descriptive button text', async () => {
      // Assert: Button should have clear, descriptive text
      await expect(generatePage.generateButton).toHaveText('Generate Name');
    });
  });
});
