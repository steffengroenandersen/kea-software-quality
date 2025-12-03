import { generatePetNames as generatePetNamesService, generatePetNamesByAnimalType as generateByAnimalTypeService, generateBulkPetNames as generateBulkService } from '../services/nameGenerator.js';
import { getRecentGeneratedNames as getRecentNamesRepo, saveGeneratedName } from '../repositories/generatedNameRepository.js';

/**
 * Controller for generating pet names (User Story 1)
 * @param {number} count - Number of names to generate (default 1)
 * @returns {Promise<{statusCode: number, data: object}>}
 */
export async function generatePetNames(count = 1) {
  try {
    console.log('USER STORY 1: Generate Popular Pet Name');
    const names = generatePetNamesService(count);
    console.log('Generated names using Faker.js:', names);

    // Save each generated name to database
    for (const name of names) {
      await saveGeneratedName(name, null, count);
    }

    return {
      statusCode: 200,
      data: {
        success: true,
        names: names,
        message: 'Name generated successfully'
      }
    };
  } catch (error) {
    console.error('Error generating names:', error);
    return {
      statusCode: 500,
      data: {
        success: false,
        names: [],
        message: 'Failed to generate pet name'
      }
    };
  }
}

/**
 * Controller for generating pet names by animal type (User Story 2)
 * @param {string} animalType - The type of animal
 * @returns {Promise<{statusCode: number, data: object}>}
 */
export async function generatePetNamesByAnimalType(animalType) {
  try {
    console.log('USER STORY 2: Choose Animal Type');
    const result = generateByAnimalTypeService(animalType);
    console.log('Generated result:', result);

    if (result.success) {
      // Save each generated name to database
      for (const name of result.names) {
        await saveGeneratedName(name, animalType || null, 1);
      }
      return { statusCode: 200, data: result };
    } else {
      return { statusCode: 400, data: result };
    }
  } catch (error) {
    console.error('Error generating names by animal type:', error);
    return {
      statusCode: 500,
      data: {
        success: false,
        names: [],
        message: 'Failed to generate pet name'
      }
    };
  }
}

/**
 * Controller for generating bulk pet names (User Story 3)
 * @param {number} count - Number of names to generate (1-10)
 * @returns {Promise<{statusCode: number, data: object}>}
 */
export async function generateBulkPetNames(count) {
  try {
    console.log('USER STORY 3: Get Multiple Name Suggestions');
    const result = generateBulkService(count);
    console.log('Generated bulk result:', result);

    // Check if validation failed
    if (!result.success) {
      return { statusCode: 400, data: result };
    }

    // Save each generated name to database with the actual count
    for (const name of result.names) {
      await saveGeneratedName(name, null, count);
    }

    return { statusCode: 200, data: result };
  } catch (error) {
    console.error('Error generating bulk names:', error);
    return {
      statusCode: 500,
      data: {
        success: false,
        names: [],
        message: 'Failed to generate bulk pet names'
      }
    };
  }
}

/**
 * Controller for getting recent generated names (User Story 4)
 * @returns {Promise<{statusCode: number, data: object}>}
 */
export async function getRecentGeneratedNames() {
  try {
    console.log('USER STORY 4: View Recent Generated Names');
    const recentNames = await getRecentNamesRepo();
    console.log(`Found ${recentNames.length} recent names`);

    return {
      statusCode: 200,
      data: {
        success: true,
        names: recentNames,
        count: recentNames.length
      }
    };
  } catch (error) {
    console.error('Error fetching recent names:', error);
    return {
      statusCode: 500,
      data: {
        success: false,
        names: [],
        message: 'Failed to fetch recent names'
      }
    };
  }
}
