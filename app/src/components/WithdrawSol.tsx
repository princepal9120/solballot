import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { ArrowDownCircle } from 'lucide-react';

const WithdrawSol = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const solToLamports = (sol: string) => {
        return Math.floor(Number(sol) * 1_000_000_000);
    };

    const withdrawSol = async () => {
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

            const [solVaultPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("sol_vault")],
                program.programId
            );

            const lamports = new anchor.BN(solToLamports(amount));

            await program.methods.withdrawSol(lamports)
                .accounts({
                    treasuryConfig: treasuryConfigPda,
                    solVault: solVaultPda,
                    authority: provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId
                } as any)
                .rpc();

            alert("Withdrawn " + amount + " SOL!");
            setAmount('');
        } catch (error: any) {
            console.error("Error withdrawing SOL:", error);
            alert("Withdraw failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <ArrowDownCircle className="w-5 h-5 text-red-400" />
                <h2 className="text-xl font-bold">Withdraw SOL</h2>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                withdrawSol();
            }} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Amount to Withdraw</label>
                    <div className="relative">
                        <Input
                            type="number"
                            step="0.001"
                            placeholder="e.g. 1.5"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-8"
                        />
                        <span className="absolute left-3 top-2.5 text-xs text-gray-500">◎</span>
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="ghost"
                    className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300"
                    isLoading={isLoading}
                    disabled={!amount}
                >
                    Withdraw SOL
                </Button>
            </form>
        </Card>
    )
}

export default WithdrawSol;
