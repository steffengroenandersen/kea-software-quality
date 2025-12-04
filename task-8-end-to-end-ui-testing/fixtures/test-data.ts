/**
 * Shared test data for E2E tests
 *
 * This file contains:
 * - Constants used across multiple tests
 * - Expected error messages (matching backend responses)
 * - Valid/invalid animal types
 */

export const ANIMAL_TYPES = {
  VALID: ['Dog', 'Cat', 'Bird', 'Fish', 'Hamster', 'Rabbit'],
  INVALID: ['Dragon', 'Elephant', 'Unicorn'],
  UNSUPPORTED_BY_FAKER: ['Hamster'], // Valid format but not in Faker API
};

export const ERROR_MESSAGES = {
  COUNT_REQUIRED: 'Count is required',
  COUNT_MUST_BE_NUMBER: 'Count must be a number',
  COUNT_MUST_BE_WHOLE_NUMBER: 'Count must be a whole number',
  COUNT_MIN_1: 'Count must be at least 1',
  COUNT_MAX_10: 'Count cannot exceed 10',
  ANIMAL_TYPE_REQUIRED: 'Animal type is required and cannot be empty',
  ANIMAL_TYPE_MIN_LENGTH: 'Animal type must be at least 2 characters long',
  ANIMAL_TYPE_MAX_LENGTH: 'Animal type cannot exceed 42 characters',
  ANIMAL_TYPE_NO_NUMBERS: 'Animal type cannot contain numeric values',
  ANIMAL_TYPE_ALPHA_ONLY: 'Animal type can only contain alphabetic characters (no spaces or special characters)',
  BACKEND_UNAVAILABLE: 'Failed to connect to server',
};

export const API_ENDPOINTS = {
  GENERATE: '/api/generate',
  GENERATE_BY_ANIMAL_TYPE: '/api/generate-by-animal-type',
  GENERATE_BULK: '/api/generate-bulk',
  RECENT_NAMES: '/api/recent-names',
};

export const PAGE_URLS = {
  HOME: '/',
  GENERATE: '/generate',
  GENERATE_BY_ANIMAL_TYPE: '/generate-by-animal-type',
  GENERATE_BULK: '/generate-bulk',
  RECENT_NAMES: '/recent-names',
};
