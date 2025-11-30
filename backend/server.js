import express from 'express';
import cors from 'cors';
import { generatePetNames, generatePetNamesByAnimalType, generateBulkPetNames } from './src/services/nameGenerator.js';
import { getRecentGeneratedNames, saveGeneratedName } from './src/repositories/generatedNameRepository.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API route for generating pet names (USER STORY 1)
app.post('/api/generate', async (req, res) => {
  console.log('USER STORY 1: Generate Popular Pet Name');
  console.log('Request body:', req.body);

  try {
    const { count = 1 } = req.body;

    // Generate pet names using the nameGenerator service
    const names = generatePetNames(count);

    console.log('Generated names using Faker.js:', names);

    // Save each generated name to database
    for (const name of names) {
      await saveGeneratedName(name, null, count);
    }

    res.json({
      success: true,
      names: names,
      message: 'Name generated successfully'
    });
  } catch (error) {
    console.error('Error generating names:', error);
    res.status(500).json({
      success: false,
      names: [],
      message: 'Failed to generate pet name'
    });
  }
});

// API route for generating pet names by animal type (USER STORY 2)
app.post('/api/generate-by-animal-type', async (req, res) => {
  console.log('USER STORY 2: Choose Animal Type');
  console.log('Request body:', req.body);

  try {
    const { animalType } = req.body;

    // Generate pet names by animal type using the nameGenerator service
    const result = generatePetNamesByAnimalType(animalType);

    console.log('Generated result:', result);

    if (result.success) {
      // Save each generated name to database
      for (const name of result.names) {
        await saveGeneratedName(name, animalType || null, 1);
      }
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('Error generating names by animal type:', error);
    res.status(500).json({
      success: false,
      names: [],
      message: 'Failed to generate pet name'
    });
  }
});

// API route for generating bulk pet names (USER STORY 3)
app.post('/api/generate-bulk', async (req, res) => {
  console.log('USER STORY 3: Get Multiple Name Suggestions');
  console.log('Request body:', req.body);

  try {
    // Generate 10 pet names using the nameGenerator service
    const result = generateBulkPetNames();

    console.log('Generated bulk result:', result);

    // Save each generated name to database
    for (const name of result.names) {
      await saveGeneratedName(name, null, 10);
    }

    res.json(result);
  } catch (error) {
    console.error('Error generating bulk names:', error);
    res.status(500).json({
      success: false,
      names: [],
      message: 'Failed to generate bulk pet names'
    });
  }
});

// API route for getting recent generated names (USER STORY 4)
app.get('/api/recent-names', async (req, res) => {
  console.log('USER STORY 4: View Recent Generated Names');

  try {
    const recentNames = await getRecentGeneratedNames();

    console.log(`Found ${recentNames.length} recent names`);

    res.json({
      success: true,
      names: recentNames,
      count: recentNames.length
    });
  } catch (error) {
    console.error('Error fetching recent names:', error);
    res.status(500).json({
      success: false,
      names: [],
      message: 'Failed to fetch recent names'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
