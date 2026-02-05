use anchor_lang::prelude::*;
use crate::state::{KnowledgeEntry, Citation, EntryStatus};
use crate::errors::SkillsError;

#[derive(Accounts)]
pub struct Cite<'info> {
    /// The entry that is citing
    #[account(
        mut,
        constraint = citing_entry.status == EntryStatus::Pending || citing_entry.status == EntryStatus::Active @ SkillsError::NotActive
    )]
    pub citing_entry: Account<'info, KnowledgeEntry>,
    
    /// The entry being cited
    #[account(
        mut,
        constraint = cited_entry.status == EntryStatus::Active @ SkillsError::NotActive,
        constraint = cited_entry.key() != citing_entry.key() @ SkillsError::CannotCiteSelf
    )]
    pub cited_entry: Account<'info, KnowledgeEntry>,
    
    #[account(
        init,
        payer = authority,
        space = Citation::SIZE,
        seeds = [b"citation", citing_entry.key().as_ref(), cited_entry.key().as_ref()],
        bump
    )]
    pub citation: Account<'info, Citation>,
    
    /// Must be the contributor of the citing entry
    #[account(
        mut,
        constraint = citing_entry.contributor == authority.key() @ SkillsError::Unauthorized
    )]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<Cite>) -> Result<()> {
    let citing_entry = &ctx.accounts.citing_entry;
    let cited_entry = &mut ctx.accounts.cited_entry;
    let citation = &mut ctx.accounts.citation;
    
    let clock = Clock::get()?;
    
    // Create citation record
    citation.citing_entry = citing_entry.key();
    citation.cited_entry = cited_entry.key();
    citation.cited_at = clock.unix_timestamp;
    citation.bump = ctx.bumps.citation;
    
    // Update cited entry's citation count
    cited_entry.citation_count = cited_entry.citation_count
        .checked_add(1)
        .ok_or(SkillsError::ArithmeticOverflow)?;
    
    msg!(
        "Citation created: entry #{} cites entry #{}",
        citing_entry.id,
        cited_entry.id
    );
    Ok(())
}
