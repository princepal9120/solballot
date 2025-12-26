import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, getAccount } from '@solana/spl-token';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgramPropsWithConnection } from '@/types';
import { Rocket, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

const BuyTokens = ({ walletAddress, idlWithAddress, getProvider, connection }: ProgramPropsWithConnection) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const buyTokens = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        setLoading(true);
        setStatus('Preparing transaction...');

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

            const [solVaultPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("sol_vault")],
                program.programId
            );

            // Fetch treasury config to get treasuryTokenAccount
            // Using 'any' cast as seen in other components to bypass IDL type issues
            const treasuryConfig = await program.account.treasuryConfig.fetch(treasuryConfigPda) as any;
            const treasuryTokenAccount = treasuryConfig.treasuryTokenAccount;
            const tokensPerPurchase = treasuryConfig.tokensPerPurchase.toNumber() / 1_000_000;
            const solPrice = treasuryConfig.solPrice.toNumber() / 1_000_000_000;

            const buyerTokenAccount = await getAssociatedTokenAddress(
                xMintPda,
                provider.wallet.publicKey
            );

            const transaction = new anchor.web3.Transaction();

            // Check if ATA exists
            try {
                await getAccount(connection, buyerTokenAccount);
            } catch (error) {
                // ATA doesn't exist, add creation instruction
                setStatus('Adding token account creation...');
                transaction.add(
                    createAssociatedTokenAccountInstruction(
                        provider.wallet.publicKey,
                        buyerTokenAccount,
                        provider.wallet.publicKey,
                        xMintPda
                    )
                );
            }

            // Add buy tokens instruction logic via anchor methods
            // Anchor's methods().instruction() allows adding to transaction
            setStatus('Building buy tokens instruction...');
            const buyIx = await program.methods.buyTokens()
                .accounts({
                    treasuryConfig: treasuryConfigPda,
                    solVault: solVaultPda,
                    treasuryTokenAccount: treasuryTokenAccount,
                    buyerTokenAccount: buyerTokenAccount,
                    buyer: provider.wallet.publicKey,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    systemProgram: anchor.web3.SystemProgram.programId,
                } as any)
                .instruction();

            transaction.add(buyIx);

            // Send transaction
            setStatus('Please approve the transaction...');
            const tx = await provider.sendAndConfirm(transaction);

            console.log("Transaction successful", tx);
            setStatus(`✅ Purchased ${tokensPerPurchase} tokens for ${solPrice} SOL!`);

            setTimeout(() => setStatus(''), 5000);
        } catch (err: any) {
            console.error("Error buying tokens:", err);
            if (err.message && err.message.includes('User rejected')) {
                setStatus('❌ Transaction cancelled by user');
            } else {
                setStatus(`❌ Error: ${err.message || 'Transaction failed'}`);
            }
            setTimeout(() => setStatus(''), 5000);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Rocket className="w-5 h-5 text-solana-purple" />
                <h2 className="text-xl font-bold">Buy Tokens</h2>
            </div>

            <p className="text-sm text-gray-400">
                Purchase voting tokens to participate in proposals.
            </p>

            <Button
                onClick={buyTokens}
                className="w-full bg-gradient-to-r from-solana-purple to-indigo-600 hover:opacity-90"
                isLoading={loading}
            >
                {loading ? 'Processing...' : (
                    <>
                        <Coins className="mr-2 w-4 h-4" />
                        Buy Tokens
                    </>
                )}
            </Button>

            {status && (
                <p className={cn(
                    "text-sm font-medium p-2 rounded text-center animate-in fade-in transition-all",
                    status.includes('✅') ? "text-green-400 bg-green-400/10" :
                        status.includes('❌') ? "text-red-400 bg-red-400/10" : "text-gray-400 bg-gray-500/10"
                )}>
                    {status}
                </p>
            )}
        </Card>
    )
}

export default BuyTokens;
