import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for User Story 2: Generate by Animal Type
 *
 * This page object encapsulates:
 * - Locators for UI elements on /generate-by-animal-type page
 * - Actions (fill input, click generate button)
 * - Assertions (verify name displayed for specific animal type)
 *
 * Simplified version - happy path testing only
 */
export class GenerateByAnimalTypePage {
  // Page reference
  readonly page: Page;

  // Locators (defined once, used everywhere)
  readonly animalTypeInput: Locator;
  readonly generateButton: Locator;
  readonly resultDiv: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators using IDs from the HTML
    this.animalTypeInput = page.locator('#animalType');
    this.generateButton = page.locator('#generateBtn');
    this.resultDiv = page.locator('#result');
  }

  /**
   * Navigate to the Generate by Animal Type page
   */
  async goto() {
    await this.page.goto('/generate-by-animal-type');

    // Wait for page to be fully loaded
    await expect(this.generateButton).toBeVisible();
  }

  /**
   * Fill the animal type input field
   *
   * @param animalType - The animal type to enter (e.g., "Dog", "Cat")
   */
  async fillAnimalType(animalType: string) {
    await this.animalTypeInput.clear();
    await this.animalTypeInput.fill(animalType);
  }

  /**
   * Click the "Generate Name" button
   */
  async clickGenerateButton() {
    await this.generateButton.click();
  }

  /**
   * Get the displayed pet name from the result div
   *
   * @returns The generated pet name (e.g., "Bella the Golden Retriever")
   */
  async getGeneratedName(): Promise<string> {
    // Wait for result to appear (up to 5 seconds)
    await expect(this.resultDiv).toContainText('Generated Name', { timeout: 5000 });

    // Extract the name from: "<p><strong>Generated Name for Dog:</strong> Bella the Golden Retriever</p>"
    const fullText = await this.resultDiv.textContent();
    const match = fullText?.match(/Generated Name (?:for \w+|\(generic\)):\s*(.+)/);

    if (!match || !match[1]) {
      throw new Error(`Could not extract pet name from result: ${fullText}`);
    }

    return match[1].trim();
  }

  /**
   * Verify that a name is displayed for the specified animal type
   *
   * @param animalType - The animal type to verify (e.g., "Dog")
   */
  async expectNameForAnimalType(animalType: string) {
    // Verify result contains the expected format
    await expect(this.resultDiv).toContainText(`Generated Name for ${animalType}:`);

    // Verify the name is non-empty
    const name = await this.getGeneratedName();
    expect(name.length).toBeGreaterThan(0);
  }
}
