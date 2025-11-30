import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for /generate
app.get('/generate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'generate.html'));
});

// Route for /generate-by-animal-type
app.get('/generate-by-animal-type', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'generate-by-animal-type.html'));
});

// Route for /generate-bulk
app.get('/generate-bulk', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'generate-bulk.html'));
});

// Route for /recent-names
app.get('/recent-names', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'recent-names.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
