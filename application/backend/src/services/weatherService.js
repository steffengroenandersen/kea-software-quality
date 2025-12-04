/**
 * Weather Service - Fetches current weather for Copenhagen
 * Uses Open-Meteo API (no API key required)
 */

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const COPENHAGEN_LAT = 55.6761;
const COPENHAGEN_LON = 12.5683;

/**
 * Fetch current temperature in Copenhagen
 * @returns {Promise<{success: boolean, temperature: number|null, unit: string, message: string}>}
 */
export async function getCurrentTemperature() {
  try {
    const url = `${WEATHER_API_URL}?latitude=${COPENHAGEN_LAT}&longitude=${COPENHAGEN_LON}&current=temperature_2m`;

    console.log('Fetching weather from Open-Meteo API:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API responded with status ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data.current || typeof data.current.temperature_2m !== 'number') {
      throw new Error('Invalid weather data structure');
    }

    const temperature = data.current.temperature_2m;

    console.log('Successfully fetched temperature:', temperature, '°C');

    return {
      success: true,
      temperature: temperature,
      unit: '°C',
      message: 'Weather fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    return {
      success: false,
      temperature: null,
      unit: '°C',
      message: `Failed to fetch weather: ${error.message}`
    };
  }
}
