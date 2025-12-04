import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for User Story 1: Generate Popular Pet Name
 *
 * This page object encapsulates:
 * - Locators for UI elements on /generate page
 * - Actions (click generate button)
 * - Assertions (verify name displayed, verify error message)
 *
 * Benefits:
 * - Single source of truth for locators
 * - Reusable methods across multiple tests
 * - Easy to maintain if UI changes
 */
export class GeneratePage {
  // Page reference
  readonly page: Page;

  // Locators (defined once, used everywhere)
  readonly generateButton: Locator;
  readonly resultDiv: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators using data-testid or stable IDs
    this.generateButton = page.locator('#generateBtn');
    this.resultDiv = page.locator('#result');
  }

  /**
   * Navigate to the Generate page
   */
  async goto() {
    await this.page.goto('/generate');

    // Wait for page to be fully loaded
    await expect(this.generateButton).toBeVisible();
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
   * @returns The generated pet name (text only, no "Generated Name:" prefix)
   */
  async getGeneratedName(): Promise<string> {
    // Wait for result to appear (up to 5 seconds)
    await expect(this.resultDiv).toContainText('Generated Name:', { timeout: 5000 });

    // Extract just the name from: "<p><strong>Generated Name:</strong> Fluffy</p>"
    const fullText = await this.resultDiv.textContent();
    const match = fullText?.match(/Generated Name:\s*(.+)/);

    if (!match || !match[1]) {
      throw new Error(`Could not extract pet name from result: ${fullText}`);
    }

    return match[1].trim();
  }

  /**
   * Get the error message displayed in the result div
   *
   * @returns The error message text
   */
  async getErrorMessage(): Promise<string> {
    // Wait for error to appear
    await expect(this.resultDiv).toContainText('Error:', { timeout: 5000 });

    // Extract error text from: "<p>Error: Failed to connect to server</p>"
    const fullText = await this.resultDiv.textContent();
    const match = fullText?.match(/Error:\s*(.+)/);

    if (!match || !match[1]) {
      throw new Error(`Could not extract error message from result: ${fullText}`);
    }

    return match[1].trim();
  }

  /**
   * Verify that a pet name is displayed (any valid name)
   */
  async expectNameToBeDisplayed() {
    await expect(this.resultDiv).toContainText('Generated Name:');

    const name = await this.getGeneratedName();
    expect(name.length).toBeGreaterThan(0);
  }

  /**
   * Verify that an error message is displayed
   *
   * @param expectedMessage Optional: specific error message to verify
   */
  async expectErrorToBeDisplayed(expectedMessage?: string) {
    await expect(this.resultDiv).toContainText('Error:');

    if (expectedMessage) {
      const actualMessage = await this.getErrorMessage();
      expect(actualMessage).toBe(expectedMessage);
    }
  }
}
