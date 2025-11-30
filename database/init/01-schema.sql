-- Create database schema for Pet Name Generator

-- Generated Names Table
-- Tracks all generated names for analytics
CREATE TABLE IF NOT EXISTS generated_names (
  id SERIAL PRIMARY KEY,
  animal_type VARCHAR(50),
  name VARCHAR(100) NOT NULL,
  count INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Popular Names Table
-- Stores popular pet names used as the source for name generation
-- Pre-populated with fake test data during database initialization
CREATE TABLE IF NOT EXISTS popular_names (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  animal_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_generated_names_created_at ON generated_names(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generated_names_animal_type ON generated_names(animal_type);
CREATE INDEX IF NOT EXISTS idx_popular_names_animal_type ON popular_names(animal_type);
