use anchor_lang::prelude::*;
use crate::state::{Registry, RegistryConfig};
use crate::ProtocolConfig;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = Registry::SIZE,
        seeds = [b"registry"],
        bump
    )]
    pub registry: Account<'info, Registry>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Initialize>, config: ProtocolConfig) -> Result<()> {
    let registry = &mut ctx.accounts.registry;
    
    registry.authority = ctx.accounts.authority.key();
    registry.total_entries = 0;
    registry.total_stake = 0;
    registry.total_queries = 0;
    registry.config = RegistryConfig {
        min_stake: config.min_stake,
        challenge_period: config.challenge_period,
        query_fee_bps: config.query_fee_bps,
        slash_rate_bps: config.slash_rate_bps,
        verifier_share_bps: config.verifier_share_bps,
    };
    registry.bump = ctx.bumps.registry;
    
    msg!("skills.md registry initialized");
    Ok(())
}
