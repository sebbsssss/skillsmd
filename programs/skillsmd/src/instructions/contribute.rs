use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::{Registry, KnowledgeEntry, ContributorProfile, EntryStatus};
use crate::errors::SkillsError;
use crate::KnowledgeCategory;

#[derive(Accounts)]
#[instruction(content_hash: [u8; 32])]
pub struct Contribute<'info> {
    #[account(
        mut,
        seeds = [b"registry"],
        bump = registry.bump
    )]
    pub registry: Account<'info, Registry>,
    
    #[account(
        init,
        payer = contributor,
        space = KnowledgeEntry::SIZE,
        seeds = [b"entry", &registry.total_entries.to_le_bytes()],
        bump
    )]
    pub entry: Account<'info, KnowledgeEntry>,
    
    #[account(
        init_if_needed,
        payer = contributor,
        space = ContributorProfile::SIZE,
        seeds = [b"profile", contributor.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, ContributorProfile>,
    
    /// Vault to hold stakes
    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    pub vault: SystemAccount<'info>,
    
    #[account(mut)]
    pub contributor: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<Contribute>,
    content_hash: [u8; 32],
    storage_uri: String,
    category: KnowledgeCategory,
    tags: Vec<String>,
    stake_amount: u64,
) -> Result<()> {
    let registry = &mut ctx.accounts.registry;
    let entry = &mut ctx.accounts.entry;
    let profile = &mut ctx.accounts.profile;
    
    // Validate inputs
    require!(
        stake_amount >= registry.config.min_stake,
        SkillsError::InsufficientStake
    );
    require!(
        storage_uri.len() <= KnowledgeEntry::MAX_URI_LEN,
        SkillsError::UriTooLong
    );
    require!(
        tags.len() <= KnowledgeEntry::MAX_TAGS,
        SkillsError::TooManyTags
    );
    
    // Transfer stake to vault
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.contributor.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        ),
        stake_amount,
    )?;
    
    // Hash tags for compact storage
    let tag_hashes: Vec<[u8; 8]> = tags
        .iter()
        .map(|t| {
            let hash = anchor_lang::solana_program::hash::hash(t.as_bytes());
            let mut arr = [0u8; 8];
            arr.copy_from_slice(&hash.to_bytes()[..8]);
            arr
        })
        .collect();
    
    let clock = Clock::get()?;
    
    // Initialize entry
    entry.id = registry.total_entries;
    entry.content_hash = content_hash;
    entry.storage_uri = storage_uri;
    entry.contributor = ctx.accounts.contributor.key();
    entry.category = category;
    entry.tag_hashes = tag_hashes;
    entry.stake_amount = stake_amount;
    entry.verification_count = 0;
    entry.verification_stake = 0;
    entry.challenge_count = 0;
    entry.citation_count = 0;
    entry.query_count = 0;
    entry.accumulated_fees = 0;
    entry.created_at = clock.unix_timestamp;
    entry.finalized_at = clock.unix_timestamp + registry.config.challenge_period;
    entry.status = EntryStatus::Pending;
    entry.bump = ctx.bumps.entry;
    
    // Update registry
    registry.total_entries = registry.total_entries
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    registry.total_stake = registry.total_stake
        .checked_add(stake_amount)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    // Update profile
    if profile.contributor == Pubkey::default() {
        profile.contributor = ctx.accounts.contributor.key();
        profile.bump = ctx.bumps.profile;
    }
    profile.entries_contributed = profile.entries_contributed
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    msg!("Knowledge contributed: entry #{}", entry.id);
    Ok(())
}
