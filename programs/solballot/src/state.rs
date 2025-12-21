use anchor_lang::prelude::*;
#[account]
#[derive(InitSpace)]
pub struct TreasuryConfig{
    pub authority: Pubkey,
    pub x_mint: Pubkey,
    pub treasury_token: Pubkey,
    pub sol_price: u64,
    pub tokens_prer_purchase: u64,
    pub bump: u8,
}
