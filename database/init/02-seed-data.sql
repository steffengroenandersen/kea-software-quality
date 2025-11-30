-- Seed data for popular_names table
-- Pre-populate with fake test data for name generation

-- Dog names
INSERT INTO popular_names (name, animal_type) VALUES
('Max', 'Dog'),
('Buddy', 'Dog'),
('Charlie', 'Dog'),
('Rocky', 'Dog'),
('Duke', 'Dog'),
('Cooper', 'Dog'),
('Bear', 'Dog'),
('Tucker', 'Dog'),
('Zeus', 'Dog'),
('Bailey', 'Dog');

-- Cat names
INSERT INTO popular_names (name, animal_type) VALUES
('Luna', 'Cat'),
('Oliver', 'Cat'),
('Leo', 'Cat'),
('Milo', 'Cat'),
('Simba', 'Cat'),
('Kitty', 'Cat'),
('Shadow', 'Cat'),
('Whiskers', 'Cat'),
('Bella', 'Cat'),
('Mittens', 'Cat');

-- Bird names
INSERT INTO popular_names (name, animal_type) VALUES
('Tweety', 'Bird'),
('Sky', 'Bird'),
('Kiwi', 'Bird'),
('Sunny', 'Bird'),
('Rio', 'Bird'),
('Peanut', 'Bird'),
('Charlie', 'Bird'),
('Mango', 'Bird'),
('Peaches', 'Bird'),
('Chirpy', 'Bird');

-- Fish names
INSERT INTO popular_names (name, animal_type) VALUES
('Nemo', 'Fish'),
('Bubbles', 'Fish'),
('Goldie', 'Fish'),
('Finn', 'Fish'),
('Splash', 'Fish'),
('Dory', 'Fish'),
('Flipper', 'Fish'),
('Coral', 'Fish'),
('Aqua', 'Fish'),
('Scales', 'Fish');

-- Hamster names
INSERT INTO popular_names (name, animal_type) VALUES
('Nibbles', 'Hamster'),
('Fluffy', 'Hamster'),
('Speedy', 'Hamster'),
('Peanut', 'Hamster'),
('Whiskers', 'Hamster'),
('Chewy', 'Hamster'),
('Snowball', 'Hamster'),
('Squeaky', 'Hamster'),
('Tiny', 'Hamster'),
('Coco', 'Hamster');

-- Rabbit names
INSERT INTO popular_names (name, animal_type) VALUES
('Thumper', 'Rabbit'),
('Cotton', 'Rabbit'),
('Hoppy', 'Rabbit'),
('Clover', 'Rabbit'),
('Snowball', 'Rabbit'),
('Bunny', 'Rabbit'),
('Fluffy', 'Rabbit'),
('Peter', 'Rabbit'),
('Daisy', 'Rabbit'),
('Oreo', 'Rabbit');

-- Generic names (no specific animal type)
INSERT INTO popular_names (name, animal_type) VALUES
('Lucky', NULL),
('Angel', NULL),
('Princess', NULL),
('Baby', NULL),
('Precious', NULL),
('Shadow', NULL),
('Happy', NULL),
('Ginger', NULL),
('Smokey', NULL),
('Midnight', NULL);
