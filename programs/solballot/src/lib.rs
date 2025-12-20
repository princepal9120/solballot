use anchor_lang::prelude::*;

declare_id!("2qJNqNuE7bXTJkJsRqtEPabpFi9W88ZKVjqESod15ymm");

#[program]
pub mod solballot {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
