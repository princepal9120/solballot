import { Card, CardContent } from '@/components/ui/Card'
import { ShieldCheck, Zap, Lock, Globe, Users } from 'lucide-react'

export function Features() {
    return (
        <section className="relative z-10 py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Protocol Infrastructure</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">Built on the core principles of decentralization and cryptographic proof.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[250px]">

                    <Card className="relative overflow-hidden border-white/10 bg-white/5 md:col-span-1 md:row-span-2 group min-h-[300px] md:min-h-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center items-center text-center relative z-10">
                            <div className="mb-6 relative">
                                <div className="absolute inset-0 bg-[var(--primary)]/20 blur-xl rounded-full" />
                                <ShieldCheck className="w-16 h-16 text-[var(--primary)] relative z-10" />
                            </div>

                            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
                                Verify
                            </h3>

                            <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
                                Every vote, proposal, and action permanently recorded on the Solana ledger.
                            </p>

                            <div className="mt-8 w-full border-t border-white/10 pt-6">
                                <div className="flex justify-between text-xs font-mono text-slate-500">
                                    <span>LATENCY</span>
                                    <span className="text-[var(--primary)]">~400ms</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                    <div className="w-full h-full bg-[var(--primary)] animate-pulse origin-left" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-white/10 bg-white/5 group min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400 mb-2">
                                Treasury
                            </h3>
                            <p className="text-slate-400 text-sm">
                                Institutional-grade multi-sig management for DAO funds.
                            </p>
                            <div className="absolute top-6 right-6 p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <Lock className="w-5 h-5 text-purple-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-white/10 bg-white/5 group min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center">
                            <div className="flex -space-x-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-black flex items-center justify-center text-white cursor-pointer hover:translate-y-[-2px] transition-transform">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-black flex items-center justify-center text-white cursor-pointer hover:translate-y-[-2px] transition-transform">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[var(--primary)] border-2 border-black flex items-center justify-center text-white cursor-pointer hover:translate-y-[-2px] transition-transform">
                                    <Users className="w-5 h-5" />
                                </div>
                            </div>
                            <p className="text-slate-300 font-medium">
                                Accessible from any wallet, anywhere in the world.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-white/10 bg-white/5 group min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 md:p-8 h-full flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-2xl bg-[#5865F2] flex items-center justify-center mb-4 shadow-lg shadow-[#5865F2]/20 group-hover:scale-110 transition-transform duration-300">
                                <Zap className="w-8 h-8 text-white fill-current" />
                            </div>
                            <p className="text-slate-400 text-sm max-w-[200px]">
                                Powered by Solana's high-speed consensus.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-white/10 bg-white/5 group min-h-[200px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardContent className="p-6 md:p-8 h-full flex flex-col justify-center items-center text-center">
                            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-yellow-400 to-yellow-600 mb-2">
                                100%
                            </h3>
                            <p className="text-slate-300 text-sm font-medium">
                                On-Chain Governance
                            </p>
                            <div className="mt-2 text-xs text-slate-500 font-mono">
                                (USD, SOL, USDC, etc)
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    )
}
