import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { AlertTriangle, Trash2 } from 'lucide-react';

const CloseProposal = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [proposalId, setProposalId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const closeProposal = async () => {
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

            // Reclaim rent to the authority/signer
            await program.methods.closeProposal(new anchor.BN(proposalId))
                .accounts({
                    proposalAccount: proposalPda,
                    authority: provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId
                } as any)
                .rpc();

            alert(`Proposal #${proposalId} closed and rent reclaimed!`);
            setProposalId('');
        } catch (error: any) {
            console.error("Error closing proposal:", error);
            alert("Failed to close proposal: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Trash2 className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-bold">Close Proposal</h2>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-sm text-red-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>Warning: This action is irreversible. Ensure you are the proposal authority.</p>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                closeProposal();
            }} className="flex gap-2">
                <Input
                    type="number"
                    placeholder="Proposal ID"
                    value={proposalId}
                    onChange={(e) => setProposalId(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" variant="danger" isLoading={isLoading}>
                    Close
                </Button>
            </form>
        </Card>
    )
}

export default CloseProposal;
