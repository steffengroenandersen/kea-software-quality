import { test, expect } from '@playwright/test';
import { GenerateByAnimalTypePage } from '../page-objects/GenerateByAnimalTypePage';

/**
 * E2E Tests for User Story 2: Generate by Animal Type
 *
 * Requirements from user-stories.md (Scenario 1 ONLY):
 * - User can enter a valid animal type (Dog, Cat, Bird, Fish, Hamster, Rabbit)
 * - User can click "Generate Name" button to get an animal-specific name
 * - System displays name in format: "Generated Name for [Animal]: [Name] the [Breed]"
 *
 * Testing approach:
 * - Happy path testing only (valid animal types)
 * - Tests run against live Docker Compose services
 * - Uses Page Object Model to separate locators from test logic
 * - Follows AAA pattern (Arrange-Act-Assert)
 * - Tests run on 3 browsers automatically (Chromium, Firefox, WebKit)
 */

test.describe('User Story 2: Generate by Animal Type', () => {
  // Declare page object (initialized in beforeEach)
  let generateByAnimalTypePage: GenerateByAnimalTypePage;

  /**
   * Setup: Navigate to Generate by Animal Type page before each test
   * This ensures each test starts from a clean state
   */
  test.beforeEach(async ({ page }) => {
    // Arrange: Initialize page object and navigate
    generateByAnimalTypePage = new GenerateByAnimalTypePage(page);
    await generateByAnimalTypePage.goto();
  });

  /**
   * HAPPY PATH SCENARIOS
   * These tests verify the core functionality works for valid animal types
   */
  test.describe('Happy Path Scenarios', () => {
    test('should generate name for Dog when entered in input field', async () => {
      // Arrange (already done in beforeEach - page is loaded)

      // Act: Fill input with "Dog" and click generate
      await generateByAnimalTypePage.fillAnimalType('Dog');
      await generateByAnimalTypePage.clickGenerateButton();

      // Assert: Verify name is displayed for Dog
      await generateByAnimalTypePage.expectNameForAnimalType('Dog');

      // Additional assertion: Verify the name format includes breed
      const generatedName = await generateByAnimalTypePage.getGeneratedName();
      expect(generatedName).toBeTruthy();
      expect(generatedName.length).toBeGreaterThan(0);
      expect(generatedName).toMatch(/\w+ the \w+/); // Format: "Name the Breed"
    });

    test('should generate names for all supported animal types', async () => {
      // Arrange: List of valid animal types
      const validAnimalTypes = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit'];

      // Act & Assert: Test each animal type
      for (const animalType of validAnimalTypes) {
        // Fill input and generate name
        await generateByAnimalTypePage.fillAnimalType(animalType);
        await generateByAnimalTypePage.clickGenerateButton();

        // Verify name is displayed for this animal type
        await generateByAnimalTypePage.expectNameForAnimalType(animalType);

        // Verify name is non-empty
        const name = await generateByAnimalTypePage.getGeneratedName();
        expect(name).toBeTruthy();
        expect(name.length).toBeGreaterThan(0);

        console.log(`✓ ${animalType}: ${name}`);
      }
    });
  });

  /**
   * UI ELEMENT VALIDATION
   * These tests verify that all required UI elements exist and are visible
   */
  test.describe('UI Element Validation', () => {
    test('should have all required elements visible on page load', async () => {
      // Assert: Verify all key elements are present
      await expect(generateByAnimalTypePage.animalTypeInput).toBeVisible();
      await expect(generateByAnimalTypePage.generateButton).toBeVisible();
      await expect(generateByAnimalTypePage.generateButton).toBeEnabled();

      // Verify page heading is visible
      const heading = generateByAnimalTypePage.page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Pet Name Generator');

      // Verify input has correct placeholder
      await expect(generateByAnimalTypePage.animalTypeInput).toHaveAttribute(
        'placeholder',
        'e.g., Dog, Cat, Bird...'
      );

      // Verify button has correct text
      await expect(generateByAnimalTypePage.generateButton).toHaveText('Generate Name');
    });
  });

  /**
   * USER INTERACTION & UI UPDATES
   * These tests verify that users can interact with the UI and it updates correctly
   */
  test.describe('User Interaction & UI Updates', () => {
    test('should allow user to type in input field and click button', async () => {
      // Act: Type "Dog" into input field
      await generateByAnimalTypePage.fillAnimalType('Dog');

      // Assert: Verify input value is "Dog"
      const inputValue = await generateByAnimalTypePage.animalTypeInput.inputValue();
      expect(inputValue).toBe('Dog');

      // Act: Click generate button
      await generateByAnimalTypePage.clickGenerateButton();

      // Assert: Verify result appears
      await expect(generateByAnimalTypePage.resultDiv).toContainText('Generated Name');
    });

    test('should update UI correctly after generation', async () => {
      // Arrange: Record start time
      const startTime = Date.now();

      // Act: Fill input with "Dog" and generate name
      await generateByAnimalTypePage.fillAnimalType('Dog');
      await generateByAnimalTypePage.clickGenerateButton();

      // Assert: Verify result displays within reasonable time (3 seconds)
      await generateByAnimalTypePage.expectNameForAnimalType('Dog');
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(responseTime).toBeLessThan(3000);
      console.log(`Response time: ${responseTime}ms`);

      // Verify result contains the animal type
      const resultText = await generateByAnimalTypePage.resultDiv.textContent();
      expect(resultText).toContain('Dog');
    });

    test('should work consistently across all browsers', async ({ browserName }) => {
      // This test runs on all configured browsers (chromium, firefox, webkit)
      console.log(`Testing on browser: ${browserName}`);

      // Act: Generate name for Cat
      await generateByAnimalTypePage.fillAnimalType('Cat');
      await generateByAnimalTypePage.clickGenerateButton();

      // Assert: Verify behavior is consistent
      await generateByAnimalTypePage.expectNameForAnimalType('Cat');
      const name = await generateByAnimalTypePage.getGeneratedName();

      expect(name).toBeTruthy();
      expect(name).toMatch(/\w+ the \w+/);
      console.log(`${browserName}: Generated "${name}"`);
    });
  });
});
