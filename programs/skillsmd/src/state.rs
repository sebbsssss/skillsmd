use anchor_lang::prelude::*;
use crate::KnowledgeCategory;

/// Protocol-level configuration and stats
#[account]
#[derive(Default)]
pub struct Registry {
    /// Authority that can update config
    pub authority: Pubkey,
    /// Total knowledge entries
    pub total_entries: u64,
    /// Total stake locked in protocol
    pub total_stake: u64,
    /// Total queries processed
    pub total_queries: u64,
    /// Protocol configuration
    pub config: RegistryConfig,
    /// Bump seed
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default)]
pub struct RegistryConfig {
    pub min_stake: u64,
    pub challenge_period: i64,
    pub query_fee_bps: u16,
    pub slash_rate_bps: u16,
    pub verifier_share_bps: u16,
}

impl Registry {
    pub const SIZE: usize = 8 + // discriminator
        32 + // authority
        8 + // total_entries
        8 + // total_stake
        8 + // total_queries
        (8 + 8 + 2 + 2 + 2) + // config
        1; // bump
}

/// A single knowledge entry in the library
#[account]
pub struct KnowledgeEntry {
    /// Unique ID (incrementing)
    pub id: u64,
    /// SHA-256 hash of content
    pub content_hash: [u8; 32],
    /// URI to full content (IPFS/Arweave/Shadow)
    pub storage_uri: String,
    /// Who contributed this
    pub contributor: Pubkey,
    /// Category of knowledge
    pub category: KnowledgeCategory,
    /// Tags (max 5, stored as hashes)
    pub tag_hashes: Vec<[u8; 8]>,
    /// Amount staked by contributor
    pub stake_amount: u64,
    /// Number of verifications
    pub verification_count: u32,
    /// Total stake from verifiers
    pub verification_stake: u64,
    /// Number of challenges
    pub challenge_count: u32,
    /// Number of citations
    pub citation_count: u32,
    /// Number of queries
    pub query_count: u64,
    /// Accumulated query fees
    pub accumulated_fees: u64,
    /// When this was created
    pub created_at: i64,
    /// When challenge period ends
    pub finalized_at: i64,
    /// Status of the entry
    pub status: EntryStatus,
    /// Bump seed
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, Default)]
pub enum EntryStatus {
    #[default]
    Pending,     // In challenge period
    Active,      // Finalized and queryable
    Challenged,  // Under dispute
    Slashed,     // Proven false, stake taken
    Archived,    // Deprecated but preserved
}

impl KnowledgeEntry {
    pub const MAX_URI_LEN: usize = 200;
    pub const MAX_TAGS: usize = 5;
    
    pub const SIZE: usize = 8 + // discriminator
        8 + // id
        32 + // content_hash
        4 + Self::MAX_URI_LEN + // storage_uri (string)
        32 + // contributor
        1 + // category
        4 + (Self::MAX_TAGS * 8) + // tag_hashes
        8 + // stake_amount
        4 + // verification_count
        8 + // verification_stake
        4 + // challenge_count
        4 + // citation_count
        8 + // query_count
        8 + // accumulated_fees
        8 + // created_at
        8 + // finalized_at
        1 + // status
        1; // bump
}

/// Verification record
#[account]
pub struct Verification {
    /// The knowledge entry being verified
    pub entry: Pubkey,
    /// Who verified
    pub verifier: Pubkey,
    /// Amount staked
    pub stake_amount: u64,
    /// When verified
    pub verified_at: i64,
    /// Rewards claimed
    pub rewards_claimed: u64,
    /// Bump
    pub bump: u8,
}

impl Verification {
    pub const SIZE: usize = 8 + 32 + 32 + 8 + 8 + 8 + 1;
}

/// Challenge record
#[account]
pub struct ChallengeRecord {
    /// The knowledge entry being challenged
    pub entry: Pubkey,
    /// Who challenged
    pub challenger: Pubkey,
    /// Hash of challenge reason
    pub reason_hash: [u8; 32],
    /// URI to challenge evidence
    pub reason_uri: String,
    /// Amount staked
    pub stake_amount: u64,
    /// When challenged
    pub challenged_at: i64,
    /// Resolution status
    pub resolved: bool,
    /// Did challenger win?
    pub challenger_won: bool,
    /// Bump
    pub bump: u8,
}

impl ChallengeRecord {
    pub const MAX_REASON_URI: usize = 200;
    pub const SIZE: usize = 8 + 32 + 32 + 32 + 4 + Self::MAX_REASON_URI + 8 + 8 + 1 + 1 + 1;
}

/// Citation link
#[account]
pub struct Citation {
    /// Entry that cites
    pub citing_entry: Pubkey,
    /// Entry being cited
    pub cited_entry: Pubkey,
    /// When cited
    pub cited_at: i64,
    /// Bump
    pub bump: u8,
}

impl Citation {
    pub const SIZE: usize = 8 + 32 + 32 + 8 + 1;
}

/// Contributor profile (tracks earnings and reputation)
#[account]
pub struct ContributorProfile {
    /// The contributor
    pub contributor: Pubkey,
    /// Total entries contributed
    pub entries_contributed: u64,
    /// Total verifications made
    pub verifications_made: u64,
    /// Total challenges made
    pub challenges_made: u64,
    /// Total challenges won
    pub challenges_won: u64,
    /// Total earnings (fees + rewards)
    pub total_earnings: u64,
    /// Unclaimed rewards
    pub unclaimed_rewards: u64,
    /// Reputation score (0-10000)
    pub reputation: u32,
    /// Bump
    pub bump: u8,
}

impl ContributorProfile {
    pub const SIZE: usize = 8 + 32 + 8 + 8 + 8 + 8 + 8 + 8 + 4 + 1;
}
