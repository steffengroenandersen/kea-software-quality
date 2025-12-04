import { expect, Page } from '@playwright/test';

/**
 * Common test helper utilities
 */

/**
 * Wait for an element to contain specific text
 */
export async function waitForText(page: Page, selector: string, text: string, timeout: number = 5000) {
  const locator = page.locator(selector);
  await expect(locator).toContainText(text, { timeout });
}

/**
 * Extract text from an element, removing extra whitespace
 */
export async function getCleanText(page: Page, selector: string): Promise<string> {
  const element = page.locator(selector);
  const text = await element.textContent();
  return text?.trim() || '';
}

/**
 * Verify that a string looks like a valid pet name (only letters)
 */
export function isValidPetName(name: string): boolean {
  return /^[A-Za-z]+$/.test(name) && name.length > 0;
}
