import { jest } from '@jest/globals';
import { getWeather } from '../../../src/controllers/weatherController.js';

describe('Weather API Integration Test', () => {
  test('should successfully fetch current temperature from Open-Meteo API', async () => {
    // Arrange: No setup needed - will call real API

    // Act: Call controller directly
    const result = await getWeather();

    // Assert: Verify response structure and data
    expect(result.statusCode).toBe(200);
    expect(result.data.success).toBe(true);
    expect(typeof result.data.temperature).toBe('number');
    expect(result.data.unit).toBe('°C');
    expect(result.data.city).toBe('Copenhagen');
    expect(result.data.message).toBe('Weather fetched successfully');

    // Assert: Temperature is in reasonable range for Copenhagen
    expect(result.data.temperature).toBeGreaterThan(-30);
    expect(result.data.temperature).toBeLessThan(40);
  });
});

describe('Weather API Integration Test (Mocked)', () => {
  beforeEach(() => {
    // Save original fetch
    global.originalFetch = global.fetch;
  });

  afterEach(() => {
    // Restore original fetch
    global.fetch = global.originalFetch;
  });

  test('should successfully fetch current temperature from Open-Meteo API (mocked)', async () => {
    // Arrange: Mock the fetch API to return a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          current: {
            temperature_2m: 12.5
          }
        })
      })
    );

    // Act: Call controller directly
    const result = await getWeather();

    // Assert: Verify fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast?latitude=55.6761&longitude=12.5683&current=temperature_2m'
    );

    // Assert: Verify response structure and data
    expect(result.statusCode).toBe(200);
    expect(result.data.success).toBe(true);
    expect(result.data.temperature).toBe(12.5);
    expect(result.data.unit).toBe('°C');
    expect(result.data.city).toBe('Copenhagen');
    expect(result.data.message).toBe('Weather fetched successfully');
  });

  test('should handle API failure gracefully (mocked)', async () => {
    // Arrange: Mock the fetch API to return a failed response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 503
      })
    );

    // Act: Call controller directly
    const result = await getWeather();

    // Assert: Verify response indicates failure
    expect(result.statusCode).toBe(503);
    expect(result.data.success).toBe(false);
    expect(result.data.temperature).toBe(null);
    expect(result.data.unit).toBe('°C');
    expect(result.data.city).toBe('Copenhagen');
    expect(result.data.message).toContain('Failed to fetch weather');
  });

  test('should handle network errors gracefully (mocked)', async () => {
    // Arrange: Mock the fetch API to throw a network error
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    // Act: Call controller directly
    const result = await getWeather();

    // Assert: Verify response indicates failure
    expect(result.statusCode).toBe(503);
    expect(result.data.success).toBe(false);
    expect(result.data.temperature).toBe(null);
    expect(result.data.message).toContain('Failed to fetch weather');
    expect(result.data.message).toContain('Network error');
  });

  test('should handle invalid response structure (mocked)', async () => {
    // Arrange: Mock the fetch API to return invalid data structure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
          // Missing 'current' field
          invalid: 'data'
        })
      })
    );

    // Act: Call controller directly
    const result = await getWeather();

    // Assert: Verify response indicates failure
    expect(result.statusCode).toBe(503);
    expect(result.data.success).toBe(false);
    expect(result.data.temperature).toBe(null);
    expect(result.data.message).toContain('Invalid weather data structure');
  });
});
