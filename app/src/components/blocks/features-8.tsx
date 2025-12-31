import { Card, CardContent } from '@/components/ui/Card'
import { ShieldCheck, Zap, BarChart3, Lock, Globe } from 'lucide-react'

export function Features() {
    return (
        <section className="relative z-10 py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Protocol Infrastructure</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">Built on the core principles of decentralization and cryptographic proof.</p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Feature 1: On-Chain Verification */}
                    <Card className="relative overflow-hidden border-white/10 bg-white/5 md:col-span-2 lg:col-span-2">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 p-3 rounded-2xl bg-[#9b87f5]/10 border border-[#9b87f5]/20">
                                    <ShieldCheck className="w-8 h-8 text-[#9b87f5]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">On-Chain Verification</h3>
                                    <p className="text-slate-400">Every vote, proposal registration, and treasury action is permanently recorded on the Solana ledger. Audit governance in real-time with explorer integration.</p>
                                    <div className="mt-4 flex items-center gap-4">
                                        <span className="px-3 py-1 rounded-lg bg-slate-800/50 text-xs font-mono text-slate-300 border border-slate-700">PROG_ID: SOLB...VOTE</span>
                                        <span className="px-3 py-1 rounded-lg bg-slate-800/50 text-xs font-mono text-slate-300 border border-slate-700">LATENCY: ~400ms</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feature 2: Secured Treasury */}
                    <Card className="relative overflow-hidden border-white/10 bg-white/5">
                        <CardContent className="p-8 h-full flex flex-col">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 w-fit mb-4">
                                <Lock className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Secured Treasury</h3>
                            <p className="text-slate-400 text-sm flex-1">Institutional-grade treasury management for DAO funds. Multi-sig ready and stake-backed proposal mechanisms.</p>
                        </CardContent>
                    </Card>

                    {/* Feature 3: Fast Voting */}
                    <Card className="relative overflow-hidden border-white/10 bg-white/5">
                        <CardContent className="p-8 h-full flex flex-col">
                            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 w-fit mb-4">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                            <p className="text-slate-400 text-sm flex-1">Powered by Solana's high-speed consensus. Vote transactions confirm in under a second with minimal fees.</p>
                        </CardContent>
                    </Card>

                    {/* Feature 4: Global Access */}
                    <Card className="relative overflow-hidden border-white/10 bg-white/5">
                        <CardContent className="p-8 h-full flex flex-col">
                            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 w-fit mb-4">
                                <Globe className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Global Access</h3>
                            <p className="text-slate-400 text-sm flex-1">Participate in governance from any Solana-compatible wallet. Fast, cheap, and barrier-free.</p>
                        </CardContent>
                    </Card>

                    {/* Feature 5: Governance Dashboard */}
                    <Card className="relative overflow-hidden border-white/10 bg-white/5 md:col-span-2">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                    <BarChart3 className="w-8 h-8 text-amber-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2">Governance Dashboard</h3>
                                    <p className="text-slate-400">A Bento-styled dashboard providing high-density information without the clutter. Monitor stakes, votes, and winners in one unified view.</p>
                                    <div className="mt-6 grid grid-cols-3 gap-3">
                                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                            <div className="text-2xl font-bold text-white">∞</div>
                                            <div className="text-xs text-slate-400 mt-1">Proposals</div>
                                        </div>
                                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                            <div className="text-2xl font-bold text-[#9b87f5]">SOL</div>
                                            <div className="text-xs text-slate-400 mt-1">Native Token</div>
                                        </div>
                                        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                            <div className="text-2xl font-bold text-emerald-400">100%</div>
                                            <div className="text-xs text-slate-400 mt-1">On-Chain</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
