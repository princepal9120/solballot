import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { Search, Clock, Users } from 'lucide-react';

interface ProposalDetails {
    proposalId: number;
    proposalInfo: string;
    numberOfVotes: number;
    deadline: anchor.BN;
    authority: PublicKey;
}

const ProposalInfo = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [proposalId, setProposalId] = useState('');
    const [proposalData, setProposalData] = useState<ProposalDetails | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProposal = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        if (!proposalId) {
            setError("Please enter a proposal ID");
            return;
        }

        setLoading(true);
        setError('');
        setProposalData(null);

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

            const proposal = await program.account.proposal.fetch(proposalPda) as any;

            setProposalData(proposal);
        } catch (err: any) {
            console.error("Error fetching proposal:", err);
            if (err.message.includes("Account does not exist")) {
                setError(`Proposal #${proposalId} not found.`);
            } else {
                setError("Failed to fetch proposal: " + err.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const formatDeadline = (timestamp: anchor.BN) => {
        const date = new Date(timestamp.toNumber() * 1000);
        return date.toLocaleString();
    }

    return (
        <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Search className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-bold">Proposal Lookup</h2>
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                fetchProposal();
            }} className="flex gap-2">
                <Input
                    type="number"
                    placeholder="ID"
                    className="w-20"
                    value={proposalId}
                    onChange={(e) => setProposalId(e.target.value)}
                />
                <Button type="submit" isLoading={loading} className="flex-1">
                    Fetch Info
                </Button>
            </form>

            {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

            {proposalData && (
                <div className="bg-solana-surface/80 rounded-lg p-5 border border-solana-purple/20 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-start">
                        <span className="text-xs font-mono bg-solana-base px-2 py-1 rounded text-solana-purple border border-solana-purple/20">#{proposalData.proposalId}</span>
                        <span className="text-xs text-gray-500 font-mono" title={proposalData.authority.toBase58()}>
                            Auth: {proposalData.authority.toBase58().slice(0, 4)}...
                        </span>
                    </div>

                    <p className="font-medium text-lg text-white leading-relaxed">{proposalData.proposalInfo}</p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-solana-base p-3 rounded-lg border border-white/5 flex items-center gap-3">
                            <div className="bg-solana-purple/10 p-1.5 rounded-md">
                                <Users className="w-4 h-4 text-solana-purple" />
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Votes</span>
                                <span className="font-bold font-mono text-white">{proposalData.numberOfVotes}</span>
                            </div>
                        </div>
                        <div className="bg-solana-base p-3 rounded-lg border border-white/5 flex items-center gap-3">
                            <div className="bg-solana-green/10 p-1.5 rounded-md">
                                <Clock className="w-4 h-4 text-solana-green" />
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">Deadline</span>
                                <span className="text-[10px] font-mono leading-tight text-white">{formatDeadline(proposalData.deadline)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    )
}

export default ProposalInfo;

