import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { Vote as VoteIcon, Hash } from 'lucide-react';

const Vote = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [proposalId, setProposalId] = useState('');
    const [amount, setAmount] = useState(''); // Vote amount (1 token = 1 vote)
    const [isLoading, setIsLoading] = useState(false);

    // Convert tokens to raw amount (6 decimals)
    const tokensToRaw = (tokens: string) => {
        return Math.floor(Number(tokens) * 1_000_000);
    };

    const vote = async () => {
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

            const [voterPda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("voter"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );

            const [xMintPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("x_mint")],
                program.programId
            );

            const voterTokenAccount = await getAssociatedTokenAddress(
                xMintPda,
                provider.wallet.publicKey
            );

            const [treasuryConfigPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("treasury_config")],
                program.programId
            );

            const treasuryConfig = await program.account.treasuryConfig.fetch(treasuryConfigPda) as any;
            const treasuryTokenAccount = treasuryConfig.treasuryTokenAccount;

            const voteAmount = new anchor.BN(tokensToRaw(amount));
            const pid = new anchor.BN(proposalId);

            await program.methods.proposalToVote(pid, voteAmount)
                .accounts({
                    voterAccount: voterPda,
                    xMint: xMintPda,
                    voterTokenAccount: voterTokenAccount,
                    treasuryTokenAccount: treasuryTokenAccount,
                    proposalAccount: proposalPda,
                    authority: provider.wallet.publicKey,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                } as any)
                .rpc();

            alert("Vote Cast Successfully!");
            setAmount('');
        } catch (error: any) {
            console.error("Error casting vote:", error);
            alert("Failed to cast vote: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <VoteIcon className="w-5 h-5 text-solana-purple" />
                <h2 className="text-xl font-bold">Cast Vote</h2>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                vote();
            }} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Proposal ID</label>
                    <div className="relative">
                        <Input
                            type="number"
                            placeholder="e.g. 1"
                            value={proposalId}
                            onChange={(e) => setProposalId(e.target.value)}
                            className="pl-8"
                        />
                        <Hash className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Vote Amount (Tokens)</label>
                    <Input
                        type="number"
                        placeholder="e.g. 100"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm"
                    isLoading={isLoading}
                    disabled={!proposalId || !amount}
                >
                    Cast Vote
                </Button>
            </form>
        </Card>
    )
}

export default Vote;
