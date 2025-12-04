import { getCurrentTemperature } from '../services/weatherService.js';

/**
 * Controller for fetching current weather in Copenhagen
 * @returns {Promise<{statusCode: number, data: object}>}
 */
export async function getWeather() {
  try {
    console.log('Weather endpoint called');
    const result = await getCurrentTemperature();

    if (result.success) {
      return {
        statusCode: 200,
        data: {
          success: true,
          temperature: result.temperature,
          unit: result.unit,
          city: 'Copenhagen',
          message: result.message
        }
      };
    } else {
      // Weather service failed - return 503 Service Unavailable
      return {
        statusCode: 503,
        data: {
          success: false,
          temperature: null,
          unit: '°C',
          city: 'Copenhagen',
          message: result.message
        }
      };
    }
  } catch (error) {
    console.error('Error in weather controller:', error);
    return {
      statusCode: 500,
      data: {
        success: false,
        temperature: null,
        unit: '°C',
        city: 'Copenhagen',
        message: 'Internal server error'
      }
    };
  }
}
