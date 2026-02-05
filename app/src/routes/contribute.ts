import { Router } from 'express';
import { connection, PROGRAM_ID } from '../index';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import crypto from 'crypto';

export const contributeRouter = Router();

interface ContributeRequest {
  content: string;
  category: 'fact' | 'observation' | 'pattern' | 'procedure' | 'opinion';
  tags: string[];
  stakeAmount?: number;
  contributor: string; // Pubkey as string
}

/**
 * Create a contribution transaction (unsigned)
 * Agent signs and submits
 */
contributeRouter.post('/', async (req, res) => {
  try {
    const { content, category, tags, stakeAmount = 10000000, contributor }: ContributeRequest = req.body;

    if (!content || !category || !contributor) {
      return res.status(400).json({ 
        error: 'Missing required fields: content, category, contributor' 
      });
    }

    if (tags.length > 5) {
      return res.status(400).json({ error: 'Maximum 5 tags allowed' });
    }

    // Hash content
    const contentHash = crypto.createHash('sha256').update(content).digest();
    
    // In production: Upload to IPFS/Shadow Drive and get URI
    // For now, use placeholder
    const storageUri = `ipfs://placeholder/${contentHash.toString('hex')}`;

    // Get registry PDA
    const [registryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('registry')],
      PROGRAM_ID
    );

    // Get contributor profile PDA
    const contributorPubkey = new PublicKey(contributor);
    const [profilePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('profile'), contributorPubkey.toBuffer()],
      PROGRAM_ID
    );

    // Get vault PDA
    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('vault')],
      PROGRAM_ID
    );

    // Return transaction details for agent to construct and sign
    res.json({
      success: true,
      contentHash: contentHash.toString('hex'),
      storageUri,
      accounts: {
        registry: registryPda.toBase58(),
        profile: profilePda.toBase58(),
        vault: vaultPda.toBase58(),
        contributor: contributor,
        systemProgram: SystemProgram.programId.toBase58()
      },
      params: {
        contentHash: Array.from(contentHash),
        storageUri,
        category: categoryToIndex(category),
        tags,
        stakeAmount
      },
      instruction: 'contribute',
      message: 'Construct transaction with these accounts and params, sign, and submit'
    });
  } catch (error) {
    console.error('Contribute error:', error);
    res.status(500).json({ error: 'Failed to prepare contribution' });
  }
});

/**
 * Verify knowledge (stake on accuracy)
 */
contributeRouter.post('/verify', async (req, res) => {
  try {
    const { entryId, stakeAmount, verifier } = req.body;

    if (!entryId || !verifier) {
      return res.status(400).json({ error: 'Missing entryId or verifier' });
    }

    // Derive entry PDA
    const [entryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('entry'), Buffer.from(new Uint8Array(new BigUint64Array([BigInt(entryId)]).buffer))],
      PROGRAM_ID
    );

    const verifierPubkey = new PublicKey(verifier);
    
    // Derive verification PDA
    const [verificationPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('verification'), entryPda.toBuffer(), verifierPubkey.toBuffer()],
      PROGRAM_ID
    );

    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('vault')],
      PROGRAM_ID
    );

    const [profilePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('profile'), verifierPubkey.toBuffer()],
      PROGRAM_ID
    );

    res.json({
      success: true,
      accounts: {
        entry: entryPda.toBase58(),
        verification: verificationPda.toBase58(),
        profile: profilePda.toBase58(),
        vault: vaultPda.toBase58(),
        verifier
      },
      params: {
        stakeAmount: stakeAmount || 5000000
      },
      instruction: 'verify'
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ error: 'Failed to prepare verification' });
  }
});

function categoryToIndex(category: string): number {
  const categories = ['fact', 'observation', 'pattern', 'procedure', 'opinion'];
  return categories.indexOf(category);
}
