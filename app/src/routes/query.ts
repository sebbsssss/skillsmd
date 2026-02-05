import { Router } from 'express';
import { connection, PROGRAM_ID } from '../index';
import { PublicKey } from '@solana/web3.js';

export const queryRouter = Router();

interface QueryRequest {
  query: string;
  category?: string;
  tags?: string[];
  limit?: number;
}

interface KnowledgeEntry {
  id: number;
  contentHash: string;
  storageUri: string;
  contributor: string;
  category: string;
  tags: string[];
  stakeAmount: number;
  verificationCount: number;
  citationCount: number;
  queryCount: number;
  createdAt: number;
  status: string;
}

// In-memory index (replace with proper DB in production)
const knowledgeIndex: Map<number, KnowledgeEntry> = new Map();

/**
 * Query knowledge by semantic search
 */
queryRouter.post('/', async (req, res) => {
  try {
    const { query, category, tags, limit = 10 }: QueryRequest = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // TODO: Implement semantic search with embeddings
    // For now, return placeholder
    const results = Array.from(knowledgeIndex.values())
      .filter(entry => {
        if (category && entry.category !== category) return false;
        if (tags?.length) {
          const entryTags = new Set(entry.tags);
          if (!tags.some(t => entryTags.has(t))) return false;
        }
        return entry.status === 'Active';
      })
      .slice(0, limit);

    res.json({
      query,
      results,
      count: results.length,
      totalAvailable: knowledgeIndex.size
    });
  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ error: 'Query failed' });
  }
});

/**
 * Get knowledge entry by ID
 */
queryRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    // Derive PDA for entry
    const [entryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('entry'), Buffer.from(new Uint8Array(new BigUint64Array([BigInt(id)]).buffer))],
      PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(entryPda);
    
    if (!accountInfo) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    // TODO: Decode account data properly
    res.json({
      id,
      address: entryPda.toBase58(),
      exists: true,
      data: accountInfo.data.toString('base64')
    });
  } catch (error) {
    console.error('Get entry error:', error);
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

/**
 * List all entries (paginated)
 */
queryRouter.get('/', async (req, res) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 20;

    const entries = Array.from(knowledgeIndex.values())
      .slice(offset, offset + limit);

    res.json({
      entries,
      offset,
      limit,
      total: knowledgeIndex.size
    });
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: 'Failed to list entries' });
  }
});
