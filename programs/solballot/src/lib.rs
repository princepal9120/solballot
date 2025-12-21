use anchor_lang::prelude::*;
mod state;
mod contexts;


declare_id!("2qJNqNuE7bXTJkJsRqtEPabpFi9W88ZKVjqESod15ymm");

#[program]
pub mod solballot {
    use super::*;

    pub fn initialize_treasury(ctx: Context<InitializeTreasury>) -> Result<()> {
        let treasury_config_account = &mut ctx.accounts.treasury_config_account;
        treasury_config_account.authority=ctx.accounts.authority.key();
        treasury_config_account.bump=ctx.bumps.sol_vault;
        treasury_config_account.
        
        Ok(())
    }
}


