import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY || 'your-secret-key';
const DATA_FILE = join(__dirname, 'mps.json');

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// API key middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Could not validate credentials' });
  }
  next();
};

// Load MPs data
let mpsData = [];

async function loadMpsData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    mpsData = JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, initialize with empty array
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
      mpsData = [];
    } else {
      console.error('Error loading MPs data:', error);
    }
  }
}

// Routes
app.get('/api/mps', async (req, res) => {
  try {
    await loadMpsData();
    
    // Convert string percentages to numbers and handle null/undefined values
    const formattedMps = mpsData.map(mp => ({
      ...mp,
      performance_metrics: {
        attendance_percentage: mp.performance_metrics.attendance_percentage ? 
          parseFloat(mp.performance_metrics.attendance_percentage) : null,
        questions_asked: mp.performance_metrics.questions_asked ? 
          parseInt(mp.performance_metrics.questions_asked) : 0,
        mplads_fund_utilization: mp.performance_metrics.mplads_fund_utilization ? 
          parseFloat(mp.performance_metrics.mplads_fund_utilization.replace(/[^0-9.]/g, '')) : null
      }
    }));
    
    res.json(formattedMps);
  } catch (error) {
    console.error('Error fetching MPs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/mps/:id', async (req, res) => {
  try {
    await loadMpsData();
    let mp = mpsData.find(mp => mp.id === req.params.id);
    if (!mp) {
      return res.status(404).json({ error: 'MP not found' });
    }
    
    // Format the MP data to match the format in /api/mps
    mp = {
      ...mp,
      performance_metrics: {
        attendance_percentage: mp.performance_metrics.attendance_percentage ? 
          parseFloat(mp.performance_metrics.attendance_percentage) : null,
        questions_asked: mp.performance_metrics.questions_asked ? 
          parseInt(mp.performance_metrics.questions_asked) : 0,
        mplads_fund_utilization: mp.performance_metrics.mplads_fund_utilization ? 
          parseFloat(mp.performance_metrics.mplads_fund_utilization.replace(/[^0-9.]/g, '')) : null
      }
    };
    
    res.json(mp);
  } catch (error) {
    console.error('Error fetching MP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/upload', authenticateApiKey, express.json({ limit: '10mb' }), async (req, res) => {
  try {
    const newMpsData = req.body;
    
    // Basic validation
    if (!Array.isArray(newMpsData)) {
      return res.status(400).json({ error: 'Invalid data format. Expected an array of MP objects.' });
    }

    // Save to file
    await fs.writeFile(DATA_FILE, JSON.stringify(newMpsData, null, 2));
    mpsData = newMpsData;
    
    res.status(200).json({ message: 'Data uploaded successfully', count: newMpsData.length });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// For Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    await loadMpsData();
    console.log(`Server is running on port ${PORT}`);
  });
}
