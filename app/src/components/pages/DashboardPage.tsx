import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import { Coins, Vote, Users, ArrowRight, TrendingUp, Wallet } from "lucide-react"


interface DashboardPageProps {
    walletAddress: string
    tokenBalance?: number
    solBalance?: number
    voterInfo?: {
        tokensAllocated: number
        activeVotes: number
    }
    isLoading?: boolean
    onNavigate: (page: string) => void
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
    walletAddress,
    tokenBalance = 0,
    solBalance = 0,
    voterInfo,
    isLoading = false,
    onNavigate,
}) => {
    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* SOL Balance */}
                <Card>
                    <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400">SOL Balance</p>
                                {isLoading ? (
                                    <Skeleton className="h-8 w-24" />
                                ) : (
                                    <p className="text-2xl font-bold text-white">
                                        {solBalance.toFixed(4)} <span className="text-sm text-slate-400">SOL</span>
                                    </p>
                                )}
                            </div>
                            <div className="p-3 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20">
                                <Wallet className="w-5 h-5 text-[var(--primary)]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Token Balance */}
                <Card>
                    <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400">Governance Tokens</p>
                                {isLoading ? (
                                    <Skeleton className="h-8 w-24" />
                                ) : (
                                    <p className="text-2xl font-bold text-white">
                                        {tokenBalance.toLocaleString()} <span className="text-sm text-slate-400">VOTE</span>
                                    </p>
                                )}
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <Coins className="w-5 h-5 text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Votes */}
                <Card>
                    <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400">Active Votes</p>
                                {isLoading ? (
                                    <Skeleton className="h-8 w-16" />
                                ) : (
                                    <p className="text-2xl font-bold text-white">
                                        {voterInfo?.activeVotes ?? 0}
                                    </p>
                                )}
                            </div>
                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Vote className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tokens Allocated */}
                <Card>
                    <CardContent className="p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400">Tokens Allocated</p>
                                {isLoading ? (
                                    <Skeleton className="h-8 w-20" />
                                ) : (
                                    <p className="text-2xl font-bold text-white">
                                        {voterInfo?.tokensAllocated ?? 0}
                                    </p>
                                )}
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                <TrendingUp className="w-5 h-5 text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cast Vote Card */}
                <Card className="lg:col-span-2">
                    <CardHeader className="p-4 pb-2 md:p-6 md:pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Vote className="w-5 h-5 text-[var(--primary)]" />
                            Cast Your Vote
                        </CardTitle>
                        <CardDescription>
                            Participate in active governance proposals
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 space-y-4">
                        <p className="text-sm text-slate-300">
                            Browse active proposals and cast your vote to help shape the future of the protocol.
                        </p>
                        <Button onClick={() => onNavigate('proposals')} className="w-full sm:w-auto">
                            View Proposals
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Action Center */}
                <Card>
                    <CardHeader className="p-4 pb-2 md:p-6 md:pb-4">
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 space-y-3">
                        <Button
                            variant="secondary"
                            className="w-full justify-start"
                            onClick={() => onNavigate('proposals')}
                        >
                            <Vote className="w-4 h-4 mr-2" />
                            Create Proposal
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full justify-start"
                            onClick={() => onNavigate('treasury')}
                        >
                            <Coins className="w-4 h-4 mr-2" />
                            Buy Tokens
                        </Button>
                        <Button
                            variant="secondary"
                            className="w-full justify-start"
                            onClick={() => onNavigate('settings')}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Account Settings
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
