const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulation endpoints

/**
 * Coin flip simulation endpoint
 * POST /api/simulate/coin-flip
 * Body: { count: number, probability: number }
 * Returns: { results: Array<'heads' | 'tails'>, stats: { heads: number, tails: number } }
 */
app.post('/api/simulate/coin-flip', (req, res) => {
  const { count = 1, probability = 0.5 } = req.body;
  
  if (count < 1 || count > 10000) {
    return res.status(400).json({ error: 'Count must be between 1 and 10000' });
  }
  
  if (probability < 0 || probability > 1) {
    return res.status(400).json({ error: 'Probability must be between 0 and 1' });
  }
  
  const results = [];
  let heads = 0;
  let tails = 0;
  
  for (let i = 0; i < count; i++) {
    const result = Math.random() < probability ? 'heads' : 'tails';
    results.push(result);
    if (result === 'heads') {
      heads++;
    } else {
      tails++;
    }
  }
  
  res.json({
    results,
    stats: { heads, tails, total: count },
  });
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
