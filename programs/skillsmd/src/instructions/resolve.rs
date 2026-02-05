use anchor_lang::prelude::*;
use crate::state::{Registry, KnowledgeEntry, ChallengeRecord, ContributorProfile, EntryStatus};
use crate::errors::SkillsError;

#[derive(Accounts)]
pub struct ResolveChallenge<'info> {
    #[account(
        seeds = [b"registry"],
        bump = registry.bump,
        has_one = authority @ SkillsError::Unauthorized
    )]
    pub registry: Account<'info, Registry>,
    
    #[account(
        mut,
        constraint = entry.status == EntryStatus::Challenged @ SkillsError::NotActive
    )]
    pub entry: Account<'info, KnowledgeEntry>,
    
    #[account(
        mut,
        constraint = !challenge.resolved @ SkillsError::ChallengeAlreadyResolved,
        constraint = challenge.entry == entry.key() @ SkillsError::ChallengeNotFound
    )]
    pub challenge: Account<'info, ChallengeRecord>,
    
    /// Contributor profile (to update reputation)
    #[account(
        mut,
        seeds = [b"profile", entry.contributor.as_ref()],
        bump = contributor_profile.bump
    )]
    pub contributor_profile: Account<'info, ContributorProfile>,
    
    /// Challenger profile (to update reputation)
    #[account(
        mut,
        seeds = [b"profile", challenge.challenger.as_ref()],
        bump = challenger_profile.bump
    )]
    pub challenger_profile: Account<'info, ContributorProfile>,
    
    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    pub vault: SystemAccount<'info>,
    
    /// CHECK: Contributor receives funds if they win
    #[account(mut)]
    pub contributor: AccountInfo<'info>,
    
    /// CHECK: Challenger receives funds if they win
    #[account(mut)]
    pub challenger: AccountInfo<'info>,
    
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<ResolveChallenge>, challenger_wins: bool) -> Result<()> {
    let registry = &ctx.accounts.registry;
    let entry = &mut ctx.accounts.entry;
    let challenge = &mut ctx.accounts.challenge;
    let contributor_profile = &mut ctx.accounts.contributor_profile;
    let challenger_profile = &mut ctx.accounts.challenger_profile;
    
    let total_stake = entry.stake_amount
        .checked_add(challenge.stake_amount)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    let slash_amount = total_stake
        .checked_mul(registry.config.slash_rate_bps as u64)
        .ok_or(SkillsError::ArithmeticOverflow)?
        .checked_div(10000)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    let winner_amount = total_stake
        .checked_sub(slash_amount)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    // Get vault seeds for CPI
    let vault_bump = ctx.bumps.vault;
    let vault_seeds = &[b"vault".as_ref(), &[vault_bump]];
    let signer_seeds = &[&vault_seeds[..]];
    
    if challenger_wins {
        // Challenger wins: entry is slashed, challenger gets funds
        entry.status = EntryStatus::Slashed;
        
        // Transfer to challenger
        anchor_lang::system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.challenger.to_account_info(),
                },
                signer_seeds,
            ),
            winner_amount,
        )?;
        
        // Update reputations
        challenger_profile.challenges_won = challenger_profile.challenges_won
            .checked_add(1)
            .ok_or(SkillsError::ArithmeticOverflow)?;
        challenger_profile.reputation = challenger_profile.reputation
            .saturating_add(100);
        contributor_profile.reputation = contributor_profile.reputation
            .saturating_sub(200);
            
        msg!("Challenge resolved: challenger wins. Entry #{} slashed.", entry.id);
    } else {
        // Contributor wins: entry becomes active, contributor gets challenger's stake
        entry.status = EntryStatus::Active;
        
        // Transfer to contributor
        anchor_lang::system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.contributor.to_account_info(),
                },
                signer_seeds,
            ),
            winner_amount,
        )?;
        
        // Update reputations
        contributor_profile.reputation = contributor_profile.reputation
            .saturating_add(50);
        challenger_profile.reputation = challenger_profile.reputation
            .saturating_sub(100);
            
        msg!("Challenge resolved: contributor wins. Entry #{} validated.", entry.id);
    }
    
    challenge.resolved = true;
    challenge.challenger_won = challenger_wins;
    
    Ok(())
}
