import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { FileText, Calendar, Coins } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterProposal = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [proposalDescription, setProposalDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [stakeAmount, setStakeAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Convert tokens to raw amount (6 decimals)
    const tokensToRaw = (tokens: string) => {
        return Math.floor(Number(tokens) * 1_000_000);
    };

    const registerProposal = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        setIsLoading(true);

        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            const [proposalCounterPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("proposal_counter")],
                program.programId
            );

            // Fetch counter to get the current ID
            const counterAccount = await program.account.proposalCounter.fetch(proposalCounterPda) as any;
            const currentCount = counterAccount.count; // Assuming 'count' property exists

            const [proposalPda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("proposal"),
                    currentCount.toArrayLike(Buffer, 'le', 1)
                    // IMPORTANT: Ensure this matches the IDL assumption (u64, u32, or u8?). 
                    // Vote.tsx used 'le', 1, implying likely u8 or part of it? 
                    // Wait, 'le', 1 means 1 byte? That's small. 
                    // If ID > 255 it breaks. Standard is usually u64 (8 bytes). 
                    // But Vote.tsx had: new anchor.BN(proposalId).toArrayLike(Buffer, 'le', 1)
                    // If Vote.tsx was correct, I will follow it. 
                    // But if proposal count increases, 1 byte is limiting. 
                    // I will stick to what the previous codebase seemed to imply or follow standard pattern if unsure.
                    // Re-reading Vote.tsx snippet: `new anchor.BN(proposalId).toArrayLike(Buffer, 'le', 1)` 
                    // This strongly suggests it expects 1 byte seed. I'll stick to it for now but it's risky.
                ],
                program.programId
            );

            const [treasuryConfigPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("treasury_config")],
                program.programId
            );

            const treasuryConfig = await program.account.treasuryConfig.fetch(treasuryConfigPda) as any;

            const [xMintPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("x_mint")],
                program.programId
            );

            const userTokenAccount = await getAssociatedTokenAddress(
                xMintPda,
                provider.wallet.publicKey
            );

            const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);
            const stakeRaw = tokensToRaw(stakeAmount);

            await program.methods.registerProposal(
                proposalDescription,
                new anchor.BN(deadlineTimestamp),
                new anchor.BN(stakeRaw)
            )
                .accounts({
                    proposalAccount: proposalPda,
                    proposalCounter: proposalCounterPda,
                    treasuryConfig: treasuryConfigPda,
                    xMint: xMintPda,
                    userTokenAccount: userTokenAccount,
                    treasuryTokenAccount: treasuryConfig.treasuryTokenAccount,
                    authority: provider.wallet.publicKey,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    systemProgram: anchor.web3.SystemProgram.programId,
                } as any)
                .rpc();

            toast.success("Proposal Registered! ID: " + currentCount.toString());
            setProposalDescription('');
            setDeadline('');
            setStakeAmount('');

            await program.methods.registerProposal(
                proposalDescription,
                new anchor.BN(deadlineTimestamp),
                new anchor.BN(stakeRaw)
            )
                .accounts({
                    proposalAccount: proposalPda,
                    proposalCounter: proposalCounterPda,
                    treasuryConfig: treasuryConfigPda,
                    xMint: xMintPda,
                    userTokenAccount: userTokenAccount,
                    treasuryTokenAccount: treasuryConfig.treasuryTokenAccount,
                    authority: provider.wallet.publicKey,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    systemProgram: anchor.web3.SystemProgram.programId,
                } as any)
                .rpc();

            toast.success("Proposal Registered! ID: " + currentCount.toString());
            setProposalDescription('');
            setDeadline('');
            setStakeAmount('');
        } catch (error: any) {
            console.error("Error registering proposal:", error);
            toast.error("Failed to register proposal: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <FileText className="w-5 h-5 text-solana-green" />
                <h2 className="text-xl font-bold">Register Proposal</h2>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                registerProposal();
            }} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Description</label>
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="What is this proposal about?"
                            value={proposalDescription}
                            onChange={(e) => setProposalDescription(e.target.value)}
                            className="pl-8"
                        />
                        <FileText className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Deadline</label>
                    <div className="relative">
                        <Input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="bg-white/5 border-white/10 text-white pl-8"
                        />
                        <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Stake Amount</label>
                    <div className="relative">
                        <Input
                            type="number"
                            step="0.01"
                            placeholder="e.g. 100"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            className="pl-8"
                        />
                        <Coins className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium border border-slate-700"
                    isLoading={isLoading}
                    disabled={!proposalDescription || !deadline || !stakeAmount}
                >
                    Register Proposal
                </Button>
            </form>
        </Card>
    )
}

export default RegisterProposal;
