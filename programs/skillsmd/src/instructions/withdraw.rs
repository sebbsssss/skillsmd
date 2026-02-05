use anchor_lang::prelude::*;
use crate::state::ContributorProfile;
use crate::errors::SkillsError;

#[derive(Accounts)]
pub struct WithdrawRewards<'info> {
    #[account(
        mut,
        seeds = [b"profile", contributor.key().as_ref()],
        bump = profile.bump,
        constraint = profile.contributor == contributor.key() @ SkillsError::Unauthorized
    )]
    pub profile: Account<'info, ContributorProfile>,
    
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

pub fn handler(ctx: Context<WithdrawRewards>) -> Result<()> {
    let profile = &mut ctx.accounts.profile;
    
    let amount = profile.unclaimed_rewards;
    require!(amount > 0, SkillsError::NoRewardsToClaim);
    
    // Get vault seeds for CPI
    let vault_bump = ctx.bumps.vault;
    let vault_seeds = &[b"vault".as_ref(), &[vault_bump]];
    let signer_seeds = &[&vault_seeds[..]];
    
    // Transfer rewards to contributor
    anchor_lang::system_program::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.contributor.to_account_info(),
            },
            signer_seeds,
        ),
        amount,
    )?;
    
    // Update profile
    profile.total_earnings = profile.total_earnings
        .checked_add(amount)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    profile.unclaimed_rewards = 0;
    
    msg!("Rewards withdrawn: {} lamports", amount);
    Ok(())
}
