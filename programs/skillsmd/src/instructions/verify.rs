use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::{Registry, KnowledgeEntry, Verification, ContributorProfile, EntryStatus};
use crate::errors::SkillsError;

#[derive(Accounts)]
pub struct Verify<'info> {
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
        payer = verifier,
        space = Verification::SIZE,
        seeds = [b"verification", entry.key().as_ref(), verifier.key().as_ref()],
        bump
    )]
    pub verification: Account<'info, Verification>,
    
    #[account(
        init_if_needed,
        payer = verifier,
        space = ContributorProfile::SIZE,
        seeds = [b"profile", verifier.key().as_ref()],
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
    pub verifier: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Verify>, stake_amount: u64) -> Result<()> {
    let registry = &ctx.accounts.registry;
    let entry = &mut ctx.accounts.entry;
    let verification = &mut ctx.accounts.verification;
    let profile = &mut ctx.accounts.profile;
    
    // Cannot verify own knowledge
    require!(
        entry.contributor != ctx.accounts.verifier.key(),
        SkillsError::CannotVerifyOwn
    );
    
    // Minimum stake
    require!(
        stake_amount >= registry.config.min_stake / 2,
        SkillsError::InsufficientStake
    );
    
    // Transfer stake to vault
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.verifier.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        ),
        stake_amount,
    )?;
    
    let clock = Clock::get()?;
    
    // Create verification record
    verification.entry = entry.key();
    verification.verifier = ctx.accounts.verifier.key();
    verification.stake_amount = stake_amount;
    verification.verified_at = clock.unix_timestamp;
    verification.rewards_claimed = 0;
    verification.bump = ctx.bumps.verification;
    
    // Update entry
    entry.verification_count = entry.verification_count
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    entry.verification_stake = entry.verification_stake
        .checked_add(stake_amount)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    // Update profile
    if profile.contributor == Pubkey::default() {
        profile.contributor = ctx.accounts.verifier.key();
        profile.bump = ctx.bumps.profile;
    }
    profile.verifications_made = profile.verifications_made
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    msg!("Knowledge verified: entry #{} by {}", entry.id, ctx.accounts.verifier.key());
    Ok(())
}
