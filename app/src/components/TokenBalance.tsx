import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgramPropsWithConnection } from '@/types';
import { Wallet, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';



const TokenBalance = ({ walletAddress, idlWithAddress, getProvider, connection }: ProgramPropsWithConnection) => {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchBalance = async () => {
        if (!walletAddress) return;

        setLoading(true);
        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            const [xMintPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("x_mint")],
                program.programId
            );

            const userTokenAccount = await getAssociatedTokenAddress(
                xMintPda,
                provider.wallet.publicKey
            );

            try {
                const tokenBalance = await connection.getTokenAccountBalance(userTokenAccount);
                setBalance(tokenBalance.value.uiAmount);
            } catch (e) {
                // Account probably doesn't exist yet
                setBalance(0);
            }

        } catch (err: any) {
            console.error("Error fetching balance:", err);
            setBalance(0);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBalance();
    }, [walletAddress]);

    return (
        <Card className="flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Wallet className="w-24 h-24 transform rotate-12" />
            </div>

            <div className="flex items-center justify-between relative z-10 mb-2">
                <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-gray-400" />
                    <h2 className="text-sm font-medium text-gray-400">Your Balance</h2>
                </div>
                <Button size="sm" variant="ghost" onClick={fetchBalance} isLoading={loading} className="h-6 w-6 p-0 hover:bg-slate-800">
                    <RefreshCw className={cn("w-3 h-3 text-slate-500", loading && "animate-spin")} />
                </Button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-2 relative z-10">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-solana-purple to-solana-cyan rounded-lg blur opacity-20"></div>
                    <p className="relative text-4xl font-mono font-bold text-white tracking-tighter">
                        {balance !== null ? balance.toFixed(4) : '---'} <span className="text-sm font-sans font-normal text-gray-400">SOL</span>
                    </p>
                </div>
                <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-solana-surface border border-slate-800">
                    <span className="w-2 h-2 rounded-full bg-solana-cyan animate-pulse"></span>
                    <p className="text-xs text-gray-400 font-mono">250 TOKENS AVAILABLE</p>
                </div>
            </div>
        </Card>
    )
}

export default TokenBalance;
