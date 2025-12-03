import { faker } from '@faker-js/faker';

// Supported animal types
const SUPPORTED_ANIMALS = ['Dog', 'Cat', 'Bird', 'Fish', 'Hamster', 'Rabbit'];

/**
 * Generate pet names using Faker.js
 * @param {number} count - Number of names to generate
 * @returns {string[]} - Array of generated pet names
 */
export function generatePetNames(count = 1) {
  const names = [];

  for (let i = 0; i < count; i++) {
    const petName = faker.person.firstName();
    names.push(petName);
  }

  return names;
}

/**
 * Validate if the animal type is supported
 * @param {string} animalType - The animal type to validate
 * @returns {boolean} - True if supported, false otherwise
 */
function isValidAnimalType(animalType) {
  if (!animalType) return true; // Empty is valid (returns generic)
  return SUPPORTED_ANIMALS.some(
    animal => animal.toLowerCase() === animalType.toLowerCase()
  );
}

/**
 * Generate pet names by animal type using Faker.js
 * @param {string} animalType - The type of animal (Dog, Cat, Bird, Fish, Hamster, Rabbit)
 * @returns {object} - Object with success status, names array, and optional message
 */
export function generatePetNamesByAnimalType(animalType) {
  // Validate animal type
  if (animalType && !isValidAnimalType(animalType)) {
    return {
      success: false,
      names: [],
      message: 'Animal type not supported. Please use: Dog, Cat, Bird, Fish, Hamster, or Rabbit'
    };
  }

  // Generate name (could be customized per animal type in the future)
  const petName = faker.person.firstName();

  return {
    success: true,
    names: [petName],
    message: animalType
      ? `Name generated for ${animalType}`
      : 'Generic name generated'
  };
}

/**
 * Generate multiple pet names in bulk (1-10 names)
 * @param {number} count - Number of names to generate (1-10)
 * @returns {object} - Object with success status, names array, and message
 */
export function generateBulkPetNames(count) {
  // Validation: Check if count is provided
  if (count === undefined || count === null) {
    return {
      success: false,
      names: [],
      message: 'Count is required'
    };
  }

  // Validation: Check if count is a number
  if (typeof count !== 'number' || isNaN(count)) {
    return {
      success: false,
      names: [],
      message: 'Count must be a number'
    };
  }

  // Validation: Check if count is an integer
  if (!Number.isInteger(count)) {
    return {
      success: false,
      names: [],
      message: 'Count must be a whole number'
    };
  }

  // Validation: Check minimum value
  if (count < 1) {
    return {
      success: false,
      names: [],
      message: 'Count must be at least 1'
    };
  }

  // Validation: Check maximum value
  if (count > 10) {
    return {
      success: false,
      names: [],
      message: 'Count cannot exceed 10'
    };
  }

  // Generate names
  const names = [];
  for (let i = 0; i < count; i++) {
    const petName = faker.person.firstName();
    names.push(petName);
  }

  return {
    success: true,
    names: names,
    message: `Generated ${count} pet name${count !== 1 ? 's' : ''}`
  };
}
