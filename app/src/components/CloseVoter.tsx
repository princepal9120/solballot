import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { UserX, AlertCircle } from 'lucide-react';

const CloseVoter = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const closeVoter = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        if (!confirm("Are you sure you want to close your voter account? This cannot be undone.")) {
            return;
        }

        setIsLoading(true);

        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            const [voterPda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("voter"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );

            await program.methods.closeVoter()
                .accounts({
                    voterAccount: voterPda,
                    authority: provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId
                } as any)
                .rpc();

            alert("Voter account closed!");
        } catch (error: any) {
            console.error("Error closing voter:", error);
            alert("Failed to close voter: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <UserX className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold">Close Voter Account</h2>
            </div>

            <p className="text-sm text-gray-400">
                Unregister as a voter and reclaim your rent deposit.
            </p>

            <Button
                onClick={closeVoter}
                variant="danger"
                className="w-full flex items-center justify-center gap-2"
                isLoading={isLoading}
            >
                <AlertCircle className="w-4 h-4" />
                Close Account
            </Button>
        </Card>
    )
}

export default CloseVoter;
