use anchor_lang::prelude::*;

declare_id!("HBoWC3fVTep7FWfe1dFr1cWxiV3nQzStLwkgdnLjZymk");

#[program]
pub mod plus_program {
    use super::*;

    pub fn operation(
        ctx: Context<InitPlusProgram>,
        first: i64,
        second: i64,
        operator: Operator,
    ) -> Result<()> {
        if operator == Operator::Add {
            ctx.accounts.plus_account.result = first + second;
            msg!("addition of {} and {} is {}", first, second, first + second);
        }
        if operator == Operator::Sub {
            ctx.accounts.plus_account.result = first - second;
            msg!(
                "subtraction of {} and {} is {}",
                first,
                second,
                first - second
            );
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitPlusProgram<'info> {
    #[account(init, payer = signer,space = 8 + 8)]
    pub plus_account: Account<'info, PlusBank>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq)]
pub enum Operator {
    Add,
    Sub,
}

#[account]
#[derive()]
pub struct PlusBank {
    result: i64,
}
