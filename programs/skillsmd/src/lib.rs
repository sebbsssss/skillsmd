use anchor_lang::prelude::*;

declare_id!("SkLsMDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

pub mod state;
pub mod instructions;
pub mod errors;

use instructions::*;

#[program]
pub mod skillsmd {
    use super::*;

    /// Initialize the protocol registry
    pub fn initialize(ctx: Context<Initialize>, config: ProtocolConfig) -> Result<()> {
        instructions::initialize::handler(ctx, config)
    }

    /// Contribute new knowledge to the library
    pub fn contribute(
        ctx: Context<Contribute>,
        content_hash: [u8; 32],
        storage_uri: String,
        category: KnowledgeCategory,
        tags: Vec<String>,
        stake_amount: u64,
    ) -> Result<()> {
        instructions::contribute::handler(ctx, content_hash, storage_uri, category, tags, stake_amount)
    }

    /// Verify existing knowledge (stake on accuracy)
    pub fn verify(ctx: Context<Verify>, stake_amount: u64) -> Result<()> {
        instructions::verify::handler(ctx, stake_amount)
    }

    /// Challenge knowledge (dispute accuracy)
    pub fn challenge(
        ctx: Context<Challenge>,
        reason_hash: [u8; 32],
        reason_uri: String,
        stake_amount: u64,
    ) -> Result<()> {
        instructions::challenge::handler(ctx, reason_hash, reason_uri, stake_amount)
    }

    /// Resolve a challenge (oracle/governance)
    pub fn resolve_challenge(
        ctx: Context<ResolveChallenge>,
        challenger_wins: bool,
    ) -> Result<()> {
        instructions::resolve::handler(ctx, challenger_wins)
    }

    /// Cite knowledge in new contribution (builds citation graph)
    pub fn cite(ctx: Context<Cite>) -> Result<()> {
        instructions::cite::handler(ctx)
    }

    /// Record a query (for reward distribution)
    pub fn record_query(ctx: Context<RecordQuery>, query_fee: u64) -> Result<()> {
        instructions::query::handler(ctx, query_fee)
    }

    /// Withdraw earned rewards
    pub fn withdraw_rewards(ctx: Context<WithdrawRewards>) -> Result<()> {
        instructions::withdraw::handler(ctx)
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum KnowledgeCategory {
    Fact,        // Verifiable facts
    Observation, // Empirical observations
    Pattern,     // Statistical patterns
    Procedure,   // How-to guides
    Opinion,     // Subjective assessments
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ProtocolConfig {
    pub min_stake: u64,           // Minimum stake to contribute
    pub challenge_period: i64,    // Seconds before knowledge is finalized
    pub query_fee_bps: u16,       // Basis points for query fees
    pub slash_rate_bps: u16,      // Slash rate for bad knowledge
    pub verifier_share_bps: u16,  // Share of rewards to verifiers
}
