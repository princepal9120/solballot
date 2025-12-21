use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeTreasury<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(init, payer=authority, space=8+TreasuryConfig::INIT_SPACE, seeds=[b"treasury_config"],bump)]
    pub treasury_config_account: Account<'info, TreasuryConfig>,
    pub x_mint: Account<'info, Mint>,
    pub treasury_token: Account<'info, TokenAccount>,

    #[account(mut, seeds=[b"sol_vault"],bump)]
    pub sol_valut: AccountInfo<'info>,
     #[account(seeds=[b"mint_authority"],bump)]
    pub mint_authority: AccountInfo<'info>,

    pub system_programs: Program<'info, System>,
}
