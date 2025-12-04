import express from 'express';
import cors from 'cors';
import {
  generatePetNames,
  generatePetNamesByAnimalType,
  generateBulkPetNames,
  getRecentGeneratedNames
} from './src/controllers/petNameController.js';
import { getWeather } from './src/controllers/weatherController.js';

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
  console.log('Request body:', req.body);
  const { count = 1 } = req.body;

  const result = await generatePetNames(count);
  res.status(result.statusCode).json(result.data);
});

// API route for generating pet names by animal type (USER STORY 2)
app.post('/api/generate-by-animal-type', async (req, res) => {
  console.log('Request body:', req.body);
  const { animalType } = req.body;

  const result = await generatePetNamesByAnimalType(animalType);
  res.status(result.statusCode).json(result.data);
});

// API route for generating bulk pet names (USER STORY 3)
app.post('/api/generate-bulk', async (req, res) => {
  console.log('Request body:', req.body);
  const { count } = req.body;
  const parsedCount = parseInt(count, 10);
  console.log('Requested count:', count, '| Parsed count:', parsedCount);

  const result = await generateBulkPetNames(parsedCount);
  res.status(result.statusCode).json(result.data);
});

// API route for getting recent generated names (USER STORY 4)
app.get('/api/recent-names', async (req, res) => {
  const result = await getRecentGeneratedNames();
  res.status(result.statusCode).json(result.data);
});

// API route for getting weather in Copenhagen
app.get('/api/weather', async (req, res) => {
  const result = await getWeather();
  res.status(result.statusCode).json(result.data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
