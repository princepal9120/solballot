use anchor_lang::prelude::*;
mod state;
mod contexts;


declare_id!("2qJNqNuE7bXTJkJsRqtEPabpFi9W88ZKVjqESod15ymm");

#[program]
pub mod solballot {
    use super::*;

    pub fn initialize_treasury(ctx: Context<InitializeTreasury>) -> Result<()> {
        Ok(())
    }
}


