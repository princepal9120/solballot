import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { Banknote, Coins } from 'lucide-react';

const InitializeTreasury = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [solPrice, setSolPrice] = useState('');
    const [tokensPerPurchase, setTokensPerPurchase] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Convert SOL to lamports (1 SOL = 1,000,000,000 lamports)
    const solToLamports = (sol: string) => {
        return Math.floor(Number(sol) * 1_000_000_000);
    };

    // Convert tokens to raw amount (6 decimals)
    const tokensToRaw = (tokens: string) => {
        return Math.floor(Number(tokens) * 1_000_000);
    };

    const initializeTreasury = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        setIsLoading(true);
        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            const [treasuryConfigPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("treasury_config")],
                program.programId
            );

            const [xMintPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("x_mint")],
                program.programId
            );

            const [proposalCounterPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposal_counter")],
                program.programId
            );

            const [solVaultPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("sol_vault")],
                program.programId
            );

            const [mintAuthorityPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("mint_authority")],
                program.programId
            );

            const treasuryTokenAccount = await getAssociatedTokenAddress(
                xMintPda,
                provider.wallet.publicKey
            );

            const solPriceBN = new anchor.BN(solToLamports(solPrice));
            const tokensPerPurchaseBN = new anchor.BN(tokensToRaw(tokensPerPurchase));

            await program.methods.initializeTreasury(solPriceBN, tokensPerPurchaseBN)
                .accounts({
                    authority: provider.wallet.publicKey,
                    treasuryConfigAccount: treasuryConfigPda,
                    xMint: xMintPda,
                    treasuryTokenAccount: treasuryTokenAccount,
                    proposalCounterAccount: proposalCounterPda,
                    solVault: solVaultPda,
                    mintAuthority: mintAuthorityPda,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                    systemProgram: anchor.web3.SystemProgram.programId,
                } as any) // Type casting for now to avoid IDL type issues
                .rpc();

            alert("Treasury Initialized!");
        } catch (error: any) {
            console.error("Error initializing treasury:", error);
            alert("Failed to initialize treasury: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Banknote className="w-5 h-5 text-solana-green" />
                <h2 className="text-xl font-bold">Initialize Treasury</h2>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                initializeTreasury();
            }} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">SOL Price per Purchase</label>
                    <div className="relative">
                        <Input
                            type="number"
                            step="0.001"
                            placeholder="e.g. 1"
                            value={solPrice}
                            onChange={(e) => setSolPrice(e.target.value)}
                            className="pl-8"
                        />
                        <span className="absolute left-3 top-2.5 text-xs text-gray-500">◎</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Tokens per Purchase</label>
                    <div className="relative">
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="e.g. 1000"
                            value={tokensPerPurchase}
                            onChange={(e) => setTokensPerPurchase(e.target.value)}
                            className="pl-8"
                        />
                        <Coins className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-protocol-blue hover:bg-blue-600 text-white font-semibold shadow-sm"
                    isLoading={isLoading}
                    disabled={!solPrice || !tokensPerPurchase}
                >
                    Initialize Treasury
                </Button>
            </form>
        </Card>
    )
}

export default InitializeTreasury;
