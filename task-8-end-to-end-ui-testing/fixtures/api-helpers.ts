/**
 * API Helper utilities for E2E test setup/teardown
 *
 * These helpers allow tests to:
 * - Seed database with test data
 * - Clear database between tests
 * - Make direct API calls (bypassing UI) for setup
 */

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:4000';

export interface GenerateResponse {
  success: boolean;
  names: string[];
  message: string;
}

/**
 * Make direct API call to generate names (bypassing UI)
 * Useful for seeding data before testing User Story 4 (Recent Names)
 */
export async function generateNameViaAPI(count: number = 1): Promise<GenerateResponse> {
  const response = await fetch(`${BACKEND_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
  });

  return await response.json();
}

/**
 * Make direct API call to generate names by animal type
 */
export async function generateNameByAnimalTypeViaAPI(animalType: string): Promise<GenerateResponse> {
  const response = await fetch(`${BACKEND_URL}/api/generate-by-animal-type`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ animalType }),
  });

  return await response.json();
}

/**
 * Check if backend is healthy and reachable
 */
export async function isBackendHealthy(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    return false;
  }
}
