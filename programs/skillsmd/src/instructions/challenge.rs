use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::{Registry, KnowledgeEntry, ChallengeRecord, ContributorProfile, EntryStatus};
use crate::errors::SkillsError;

#[derive(Accounts)]
pub struct Challenge<'info> {
    #[account(
        seeds = [b"registry"],
        bump = registry.bump
    )]
    pub registry: Account<'info, Registry>,
    
    #[account(
        mut,
        constraint = entry.status == EntryStatus::Pending || entry.status == EntryStatus::Active @ SkillsError::NotActive
    )]
    pub entry: Account<'info, KnowledgeEntry>,
    
    #[account(
        init,
        payer = challenger,
        space = ChallengeRecord::SIZE,
        seeds = [b"challenge", entry.key().as_ref(), challenger.key().as_ref()],
        bump
    )]
    pub challenge: Account<'info, ChallengeRecord>,
    
    #[account(
        init_if_needed,
        payer = challenger,
        space = ContributorProfile::SIZE,
        seeds = [b"profile", challenger.key().as_ref()],
        bump
    )]
    pub profile: Account<'info, ContributorProfile>,
    
    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    pub vault: SystemAccount<'info>,
    
    #[account(mut)]
    pub challenger: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<Challenge>,
    reason_hash: [u8; 32],
    reason_uri: String,
    stake_amount: u64,
) -> Result<()> {
    let registry = &ctx.accounts.registry;
    let entry = &mut ctx.accounts.entry;
    let challenge = &mut ctx.accounts.challenge;
    let profile = &mut ctx.accounts.profile;
    
    // Cannot challenge own knowledge
    require!(
        entry.contributor != ctx.accounts.challenger.key(),
        SkillsError::CannotChallengeOwn
    );
    
    // Must stake at least as much as contributor
    require!(
        stake_amount >= entry.stake_amount,
        SkillsError::InsufficientStake
    );
    
    require!(
        reason_uri.len() <= ChallengeRecord::MAX_REASON_URI,
        SkillsError::UriTooLong
    );
    
    // Transfer stake to vault
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.challenger.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        ),
        stake_amount,
    )?;
    
    let clock = Clock::get()?;
    
    // Create challenge record
    challenge.entry = entry.key();
    challenge.challenger = ctx.accounts.challenger.key();
    challenge.reason_hash = reason_hash;
    challenge.reason_uri = reason_uri;
    challenge.stake_amount = stake_amount;
    challenge.challenged_at = clock.unix_timestamp;
    challenge.resolved = false;
    challenge.challenger_won = false;
    challenge.bump = ctx.bumps.challenge;
    
    // Update entry status
    entry.status = EntryStatus::Challenged;
    entry.challenge_count = entry.challenge_count
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    // Update profile
    if profile.contributor == Pubkey::default() {
        profile.contributor = ctx.accounts.challenger.key();
        profile.bump = ctx.bumps.profile;
    }
    profile.challenges_made = profile.challenges_made
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    msg!("Knowledge challenged: entry #{}", entry.id);
    Ok(())
}
