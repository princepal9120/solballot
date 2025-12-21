import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solballot } from "../target/types/solballot";
import { expect } from "chai";
import {getOrCreateAssociatedTokenAccount, getAccount}  from '@solana/spl-token'
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet'
import { program } from "@coral-xyz/anchor/dist/cjs/native/system";

const SEEDS ={
  SOL_VAULT: "sol_vault",
  TREASURY_CONFIG: "treasury_config",
  MINT_AUTHORITY: "mint_authority",
  X_MINT: "x_mint",

} as const;


const findPda =(programId: anchor.web3.PublicKey, seeds: (Buffer | Uint8Array)[]):anchor.web3.PublicKey=>{
 const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(seeds,programId)
 return pda;
}

describe("solballot", () => {
  // Configure the client to use the local cluster.
  const provider =anchor.AnchorProvider.env()
  anchor.setProvider(provider);
  const program = anchor.workspace.solballot as Program<Solballot>;

   const adminWallet = (provider.wallet as NodeWallet).payer;
   let treasuryConfigPda:anchor.web3.PublicKey;
   let xMintPda:anchor.web3.PublicKey;
   let solVaultPda:anchor.web3.PublicKey;
   let mintAuthorityPda:anchor.web3.PublicKey;

  beforeEach(() =>{
    treasuryConfigPda = findPda(program.programId, [anchor.utils.bytes.utf8.encode(SEEDS.TREASURY_CONFIG)]);
    xMintPda = findPda(program.programId, [anchor.utils.bytes.utf8.encode(SEEDS.X_MINT)]);
    solVaultPda = findPda(program.programId, [anchor.utils.bytes.utf8.encode(SEEDS.SOL_VAULT)]);
    mintAuthorityPda = findPda(program.programId, [anchor.utils.bytes.utf8.encode(SEEDS.MINT_AUTHORITY)]);

  })

  it("Is initializes treasury !", async () => {
    // Add your test here.
    const solPrice =  new anchor.BN(100_000_000);
    const tokensPerPurchase =new anchor.BN(100_000_000);
    const tx = await program.methods.initializeTreasury(solPrice,tokensPerPurchase).accounts({
      authority:adminWallet.publicKey,


    }).rpc();
    console.log("Your transaction signature", tx);
  });
});
 