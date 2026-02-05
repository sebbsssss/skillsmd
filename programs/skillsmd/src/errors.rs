use anchor_lang::prelude::*;

#[error_code]
pub enum SkillsError {
    #[msg("Stake amount is below minimum required")]
    InsufficientStake,
    
    #[msg("Knowledge entry is not in pending status")]
    NotPending,
    
    #[msg("Knowledge entry is not active")]
    NotActive,
    
    #[msg("Knowledge entry is already challenged")]
    AlreadyChallenged,
    
    #[msg("Challenge period has not ended")]
    ChallengePeriodActive,
    
    #[msg("Challenge period has ended")]
    ChallengePeriodEnded,
    
    #[msg("Storage URI too long")]
    UriTooLong,
    
    #[msg("Too many tags (max 5)")]
    TooManyTags,
    
    #[msg("Invalid category")]
    InvalidCategory,
    
    #[msg("Cannot verify own knowledge")]
    CannotVerifyOwn,
    
    #[msg("Cannot challenge own knowledge")]
    CannotChallengeOwn,
    
    #[msg("Already verified this entry")]
    AlreadyVerified,
    
    #[msg("Challenge not found")]
    ChallengeNotFound,
    
    #[msg("Challenge already resolved")]
    ChallengeAlreadyResolved,
    
    #[msg("No rewards to claim")]
    NoRewardsToClaim,
    
    #[msg("Unauthorized")]
    Unauthorized,
    
    #[msg("Cannot cite self")]
    CannotCiteSelf,
    
    #[msg("Citation already exists")]
    CitationExists,
    
    #[msg("Entry is slashed")]
    EntrySlashed,
    
    #[msg("Arithmetic overflow")]
    ArithmeticOverflow,
}
