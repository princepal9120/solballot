import { useState, useEffect } from 'react'
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { ThumbsUp, Calendar, Filter, RefreshCw, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Proposal {
    id: number;
    info: string;
    votes: number;
    deadline: number;
    authority: PublicKey;
    isActive: boolean;
    publicKey: PublicKey;
}

const AllProposals = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'active' | 'ended' | 'all'>('active');

    const fetchAllProposals = async () => {
        if (!walletAddress) {
            setError("Please connect your wallet");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            // Fetch all proposal accounts
            const allProposals = await program.account.proposal.all();

            const formattedProposals: Proposal[] = allProposals.map((p: any) => {
                const deadline = p.account.deadline.toNumber();
                const now = Math.floor(Date.now() / 1000);
                return {
                    id: p.account.proposalId,
                    info: p.account.proposalInfo,
                    votes: p.account.numberOfVotes,
                    deadline: deadline,
                    authority: p.account.authority,
                    isActive: deadline > now,
                    publicKey: p.publicKey
                };
            });

            setProposals(formattedProposals);
        } catch (err: any) {
            console.error("Error fetching proposals:", err);
            setError('Failed to fetch proposals: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (walletAddress) {
            fetchAllProposals();
        }
    }, [walletAddress]);

    const formatDeadline = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    const getTimeRemaining = (deadline: number) => {
        const now = Math.floor(Date.now() / 1000);
        const diff = deadline - now;

        if (diff <= 0) return 'Ended';

        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);

        if (days > 0) return `${days}d ${hours}h left`;
        if (hours > 0) return `${hours}h ${minutes}m left`;
        return `${minutes}m left`;
    };

    const filteredProposals = proposals.filter(p => {
        if (filter === 'active') return p.isActive;
        if (filter === 'ended') return !p.isActive;
        return true;
    });

    const sortedProposals = [...filteredProposals].sort((a, b) => {
        // Active proposals first, then by deadline desc (newest first)
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        return b.deadline - a.deadline;
    });

    return (
        <Card className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
                    <ThumbsUp className="w-5 h-5 text-protocol-blue" />
                    All Proposals
                </h2>

                <div className="flex items-center gap-2 bg-solana-dark p-1 rounded-lg border border-solana-surface">
                    {(['active', 'ended', 'all'] as const).map((f) => (
                        <button
                            key={f}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                                filter === f
                                    ? "bg-solana-surface text-white shadow-sm border border-solana-purple/30"
                                    : "text-gray-500 hover:text-gray-300 hover:bg-solana-surface/50"
                            )}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)} ({
                                f === 'all' ? proposals.length : proposals.filter(p => f === 'active' ? p.isActive : !p.isActive).length
                            })
                        </button>
                    ))}
                </div>

                <Button size="sm" variant="ghost" onClick={fetchAllProposals} isLoading={loading}>
                    <RefreshCw className={cn("w-4 h-4 text-gray-400", loading && "animate-spin")} />
                </Button>
            </div>

            {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

            {loading && !proposals.length && (
                <div className="flex justify-center py-8">
                    <RefreshCw className="w-8 h-8 text-solana-green animate-spin" />
                </div>
            )}

            {!loading && sortedProposals.length === 0 && !error && (
                <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                    <Filter className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No {filter !== 'all' ? filter : ''} proposals found.</p>
                </div>
            )}

            {/* ... proposal list ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedProposals.map((proposal) => (
                    <div
                        key={proposal.id}
                        className={cn(
                            "relative overflow-hidden group rounded-xl border p-5 transition-all duration-300 hover:shadow-md",
                            proposal.isActive
                                ? "bg-slate-900 border-protocol-blue/30 hover:border-protocol-blue/50"
                                : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                        )}
                    >
                        {/* Background hash decoration - subtle */}
                        <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <Hash className="w-24 h-24" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-mono text-gray-500 py-1">
                                    #{proposal.id.toString().padStart(4, '0')}
                                </span>
                                <span className={cn(
                                    "text-xs font-bold px-2 py-1 rounded-md border tracking-wide",
                                    proposal.isActive
                                        ? "bg-solana-green/10 text-solana-green border-solana-green/20 shadow-[0_0_8px_-3px_rgba(20,241,149,0.3)]"
                                        : "bg-solana-surface text-gray-500 border-gray-700"
                                )}>
                                    {proposal.isActive ? 'ACTIVE' : 'ENDED'}
                                </span>
                            </div>

                            <h3 className="text-lg font-semibold text-slate-100 mb-6 min-h-[3.5rem] tracking-tight">
                                {proposal.info}
                            </h3>

                            <div className="grid grid-cols-2 gap-px bg-slate-800 rounded-lg overflow-hidden border border-slate-800">
                                <div className="bg-slate-900/50 p-3 flex flex-col justify-center">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Votes</span>
                                    <span className="text-lg font-bold text-slate-200">{proposal.votes}</span>
                                </div>
                                <div className="bg-slate-900/50 p-3 flex flex-col justify-center">
                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Time Left</span>
                                    <span className={cn(
                                        "text-sm font-medium",
                                        getTimeRemaining(proposal.deadline) === 'Ended' ? 'text-slate-400' : 'text-protocol-teal'
                                    )}>{getTimeRemaining(proposal.deadline)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-4 font-mono">
                                <Calendar className="w-3 h-3" />
                                <span>ENDS: {formatDeadline(proposal.deadline)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default AllProposals;
