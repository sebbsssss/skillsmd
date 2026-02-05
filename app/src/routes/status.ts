import { Router } from 'express';
import { connection, PROGRAM_ID } from '../index';
import { PublicKey } from '@solana/web3.js';

export const statusRouter = Router();

/**
 * Get protocol status
 */
statusRouter.get('/', async (req, res) => {
  try {
    // Get registry PDA
    const [registryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('registry')],
      PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(registryPda);
    
    if (!accountInfo) {
      return res.json({
        initialized: false,
        programId: PROGRAM_ID.toBase58(),
        registry: registryPda.toBase58(),
        message: 'Protocol not initialized yet'
      });
    }

    // TODO: Decode registry data properly
    res.json({
      initialized: true,
      programId: PROGRAM_ID.toBase58(),
      registry: registryPda.toBase58(),
      dataSize: accountInfo.data.length
    });
  } catch (error) {
    console.error('Status error:', error);
    res.status(500).json({ error: 'Failed to fetch status' });
  }
});

/**
 * Get contributor profile
 */
statusRouter.get('/profile/:pubkey', async (req, res) => {
  try {
    const pubkey = new PublicKey(req.params.pubkey);
    
    const [profilePda] = PublicKey.findProgramAddressSync(
      [Buffer.from('profile'), pubkey.toBuffer()],
      PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(profilePda);
    
    if (!accountInfo) {
      return res.json({
        exists: false,
        pubkey: pubkey.toBase58(),
        profile: profilePda.toBase58()
      });
    }

    // TODO: Decode profile data properly
    res.json({
      exists: true,
      pubkey: pubkey.toBase58(),
      profile: profilePda.toBase58(),
      dataSize: accountInfo.data.length
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

/**
 * Get entry status
 */
statusRouter.get('/entry/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const [entryPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('entry'), Buffer.from(new Uint8Array(new BigUint64Array([BigInt(id)]).buffer))],
      PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(entryPda);
    
    if (!accountInfo) {
      return res.json({
        exists: false,
        id,
        entry: entryPda.toBase58()
      });
    }

    res.json({
      exists: true,
      id,
      entry: entryPda.toBase58(),
      dataSize: accountInfo.data.length
    });
  } catch (error) {
    console.error('Entry status error:', error);
    res.status(500).json({ error: 'Failed to fetch entry status' });
  }
});
