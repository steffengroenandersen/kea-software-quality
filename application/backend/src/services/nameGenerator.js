import { faker } from '@faker-js/faker';

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
 * Check if Faker.js has an animal method for the given animal type
 * @param {string} animalType - The animal type to check (e.g., 'dog', 'cat')
 * @returns {boolean} - True if faker.animal has a method for this type
 */
function hasFakerAnimalMethod(animalType) {
  const normalizedType = animalType.toLowerCase();
  return typeof faker.animal[normalizedType] === 'function' && normalizedType !== 'petname' && normalizedType !== 'type';
}

/**
 * Validate animal type against character-based rules
 * @param {string} animalType - The animal type to validate
 * @returns {object} - Object with valid boolean and optional error message
 */
function validateAnimalType(animalType) {
  // Check if empty/null/undefined
  if (!animalType || animalType.trim() === '') {
    return {
      valid: false,
      message: 'Animal type is required and cannot be empty'
    };
  }

  const trimmed = animalType.trim();

  // Check minimum length (2 characters)
  if (trimmed.length < 2) {
    return {
      valid: false,
      message: 'Animal type must be at least 2 characters long'
    };
  }

  // Check maximum length (42 characters)
  if (trimmed.length > 42) {
    return {
      valid: false,
      message: 'Animal type cannot exceed 42 characters'
    };
  }

  // Check for numeric values
  if (/\d/.test(trimmed)) {
    return {
      valid: false,
      message: 'Animal type cannot contain numeric values'
    };
  }

  // Check for non-alphabetic characters (only letters allowed)
  if (!/^[a-zA-Z]+$/.test(trimmed)) {
    return {
      valid: false,
      message: 'Animal type can only contain alphabetic characters (no spaces or special characters)'
    };
  }

  // Check if Faker.js supports this animal type
  if (!hasFakerAnimalMethod(trimmed)) {
    return {
      valid: false,
      message: `Animal type '${trimmed}' is not supported by the Faker.js API`
    };
  }

  return { valid: true };
}

/**
 * Generate pet names by animal type using Faker.js animal API
 * @param {string} animalType - The type of animal (must be supported by faker.animal)
 * @returns {object} - Object with success status, names array, and optional message
 */
export function generatePetNamesByAnimalType(animalType) {
  // Validate animal type using character-based rules AND Faker API check
  const validation = validateAnimalType(animalType);

  if (!validation.valid) {
    return {
      success: false,
      names: [],
      message: validation.message
    };
  }

  // Trim and normalize the animal type
  const normalizedAnimalType = animalType.trim().toLowerCase();

  // Generate pet name using faker.animal.petName()
  const petName = faker.animal.petName();

  // Get breed/species using animal-specific faker method
  const breedOrSpecies = faker.animal[normalizedAnimalType]();

  // Combine into composite name: "Coco the Golden Retriever"
  const compositeName = `${petName} the ${breedOrSpecies}`;

  return {
    success: true,
    names: [compositeName],
    message: `Name generated for ${animalType.trim()}`
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
