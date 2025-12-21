use anchor_lang::prelude::*;
mod state;
mod contexts;
use contexts::*;



declare_id!("2qJNqNuE7bXTJkJsRqtEPabpFi9W88ZKVjqESod15ymm");

#[program]
pub mod solballot {
    use super::*;

    pub fn initialize_treasury(ctx: Context<InitializeTreasury>,sol_price: u64,tokens_per_purchase:u64 ) -> Result<()> {
        let treasury_config_account = &mut ctx.accounts.treasury_config_account;
        treasury_config_account.authority=ctx.accounts.authority.key();
        treasury_config_account.bump=ctx.bumps.sol_vault;
        treasury_config_account.sol_price=sol_price;
        treasury_config_account.x_mint=ctx.accounts.x_mint.key();
        treasury_config_account.tokens_per_purchase= tokens_per_purchase;
        
        Ok(())
    }
    pub fn buy_tokens(ctx: Context<BuyTokens>, ) -> Result<()> {
        //1. User will transfer SOL to the sol_vault
        //2. token transfer to the treasury_token_account to buyer token account
        //3. X mint token
        //4. trasury config accout, to context for the sol price and token ammout transfer 
        Ok(())
    }
}


