import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { Trophy } from 'lucide-react';

const PickWinner = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [proposalId, setProposalId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const pickWinner = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        setIsLoading(true);

        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            const [proposalPda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("proposal"),
                    new anchor.BN(proposalId).toArrayLike(Buffer, 'le', 1)
                ],
                program.programId
            );

            await program.methods.pickWinner(new anchor.BN(proposalId))
                .accounts({
                    proposalAccount: proposalPda,
                    authority: provider.wallet.publicKey,
                } as any)
                .rpc();

            alert(`Winner picked for Proposal #${proposalId}!`);
            setProposalId('');
        } catch (error: any) {
            console.error("Error picking winner:", error);
            alert("Failed to pick winner: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl font-bold">Pick Winner</h2>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                pickWinner();
            }} className="flex gap-2">
                <Input
                    type="number"
                    placeholder="Proposal ID"
                    value={proposalId}
                    onChange={(e) => setProposalId(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" isLoading={isLoading} className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">
                    Pick Winner
                </Button>
            </form>
        </Card>
    )
}

export default PickWinner;
