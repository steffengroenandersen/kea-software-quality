import pool from '../config/database.js';

/**
 * Save a generated name to the database
 * @param {string} name - The pet name
 * @param {string|null} animalType - The animal type (or null for generic)
 * @param {number} count - Number of names generated in this request
 * @returns {Promise<object>} - The inserted record
 */
export async function saveGeneratedName(name, animalType = null, count = 1) {
  const query = `
    INSERT INTO generated_names (name, animal_type, count)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [name, animalType, count]);
    return result.rows[0];
  } catch (error) {
    console.error('Error saving generated name:', error);
    throw error;
  }
}

/**
 * Get the 10 most recent generated names
 * @returns {Promise<array>} - Array of recent generated names
 */
export async function getRecentGeneratedNames() {
  const query = `
    SELECT id, name, animal_type, count, created_at
    FROM generated_names
    ORDER BY created_at DESC
    LIMIT 10;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching recent names:', error);
    throw error;
  }
}
