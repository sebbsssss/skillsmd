use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::{Registry, KnowledgeEntry, EntryStatus};
use crate::errors::SkillsError;

#[derive(Accounts)]
pub struct RecordQuery<'info> {
    #[account(
        mut,
        seeds = [b"registry"],
        bump = registry.bump
    )]
    pub registry: Account<'info, Registry>,
    
    #[account(
        mut,
        constraint = entry.status == EntryStatus::Active @ SkillsError::NotActive
    )]
    pub entry: Account<'info, KnowledgeEntry>,
    
    #[account(
        mut,
        seeds = [b"vault"],
        bump
    )]
    pub vault: SystemAccount<'info>,
    
    #[account(mut)]
    pub querier: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<RecordQuery>, query_fee: u64) -> Result<()> {
    let registry = &mut ctx.accounts.registry;
    let entry = &mut ctx.accounts.entry;
    
    // Transfer query fee to vault
    if query_fee > 0 {
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.querier.to_account_info(),
                    to: ctx.accounts.vault.to_account_info(),
                },
            ),
            query_fee,
        )?;
    }
    
    // Update entry stats
    entry.query_count = entry.query_count
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    entry.accumulated_fees = entry.accumulated_fees
        .checked_add(query_fee)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    // Update registry stats
    registry.total_queries = registry.total_queries
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    msg!("Query recorded: entry #{}, fee: {} lamports", entry.id, query_fee);
    Ok(())
}
