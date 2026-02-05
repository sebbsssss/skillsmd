import express from 'express';
import cors from 'cors';
import { Connection, PublicKey } from '@solana/web3.js';
import { queryRouter } from './routes/query';
import { contributeRouter } from './routes/contribute';
import { statusRouter } from './routes/status';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Solana connection
export const connection = new Connection(
  process.env.RPC_URL || 'https://api.devnet.solana.com',
  'confirmed'
);

// Program ID (update after deployment)
export const PROGRAM_ID = new PublicKey(
  process.env.PROGRAM_ID || '4Dt5vLoGPRyJMW1Q9SLDrCSH3kzvrgoSiFH7suGW1AmV'
);

// Routes
app.use('/api/query', queryRouter);
app.use('/api/contribute', contributeRouter);
app.use('/api/status', statusRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Skill file
app.get('/skill.md', (req, res) => {
  res.type('text/markdown').sendFile(__dirname + '/../skill.md');
});

// Root
app.get('/', (req, res) => {
  res.json({
    name: 'skills.md',
    version: '0.1.0',
    description: 'On-chain knowledge library for AI agents',
    endpoints: {
      query: '/api/query',
      contribute: '/api/contribute',
      status: '/api/status',
      skill: '/skill.md',
      health: '/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🧠 skills.md API running on port ${PORT}`);
  console.log(`📚 Program ID: ${PROGRAM_ID.toBase58()}`);
});
