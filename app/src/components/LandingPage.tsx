import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, Zap, BarChart3, ChevronRight, Globe, Lock } from 'lucide-react';
import { Button } from './ui/Button';

interface LandingPageProps {
    connectWallet: () => void;
    isLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ connectWallet, isLoading }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-solana-green/30 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-solana-purple/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-solana-green/5 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>

            {/* Navigation (Simple version for landing) */}
            <nav className="relative z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="SolBallot" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold tracking-tight text-slate-100">SolBallot</span>
                </div>

                <Button
                    onClick={connectWallet}
                    isLoading={isLoading}
                    variant="ghost"
                    className="border border-slate-800 bg-slate-900/50 hover:bg-slate-800"
                >
                    Launch App
                </Button>
            </nav>

            {/* Hero Section */}
            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 pt-20 pb-32 px-8 flex flex-col items-center text-center max-w-5xl mx-auto"
            >
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-solana-purple/10 border border-solana-purple/20 text-solana-purple text-xs font-semibold mb-6">
                    <Zap className="w-3 h-3" />
                    <span>Powered by Solana Blockchain</span>
                </motion.div>

                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                    Transparent Governance <br />
                    <span className="bg-gradient-to-r from-solana-purple via-protocol-blue to-solana-green bg-clip-text">Redefined.</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                    A secure, minimalist protocol for on-chain voting. Experience institutional-grade governance with zero compromise on speed or clarity.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={connectWallet}
                        isLoading={isLoading}
                        className="h-14 px-10 text-lg bg-gradient-to-r from-solana-purple to-protocol-blue hover:opacity-90 transition-opacity"
                    >
                        <Wallet className="mr-2 w-5 h-5" />
                        Connect Wallet
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-14 px-10 text-lg border border-slate-800 hover:bg-slate-900"
                    >
                        View Demo
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </motion.div>
            </motion.section>

            {/* Features Bento Grid */}
            <section className="relative z-10 px-8 py-24 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Protocol Infrastructure</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">Built on the core principles of decentralization and cryptographic proof.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Big Feature */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between group overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-solana-purple/5 blur-3xl -mr-20 -mt-20 group-hover:bg-solana-purple/10 transition-colors" />
                        <div className="relative z-10">
                            <ShieldCheck className="w-12 h-12 text-solana-purple mb-6" />
                            <h3 className="text-2xl font-bold mb-3">On-Chain Verification</h3>
                            <p className="text-slate-400 max-w-md">Every vote, proposal registration, and treasury action is permanently recorded on the Solana ledger. Audit governance in real-time with explorer integration.</p>
                        </div>
                        <div className="mt-12 flex items-center gap-4 relative z-10">
                            <div className="px-4 py-2 rounded-xl bg-slate-800/50 text-xs font-mono text-slate-300 border border-slate-700">
                                PROG_ID: SOLB...VOTE
                            </div>
                            <div className="px-4 py-2 rounded-xl bg-slate-800/50 text-xs font-mono text-slate-300 border border-slate-700">
                                LATENCY: ~400ms
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Feature 1 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col group relative overflow-hidden"
                    >
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-solana-green/5 blur-2xl -ml-10 -mb-10 group-hover:bg-solana-green/10 transition-colors" />
                        <Lock className="w-10 h-10 text-solana-green mb-6 relative z-10" />
                        <h3 className="text-xl font-bold mb-3 relative z-10">Secured Treasury</h3>
                        <p className="text-slate-400 text-sm relative z-10">Institutional-grade treasury management for DAO funds. Multi-sig ready and stake-backed proposal mechanisms.</p>
                    </motion.div>

                    {/* Small Feature 2 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col group"
                    >
                        <Globe className="w-10 h-10 text-protocol-blue mb-6" />
                        <h3 className="text-xl font-bold mb-3">Global Access</h3>
                        <p className="text-slate-400 text-sm">Participate in global governance from any Solana-compatible wallet. Fast, cheap, and barrier-free.</p>
                    </motion.div>

                    {/* Dashboard Preview / Wide Feature */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center gap-8 overflow-hidden group"
                    >
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-3">Precise Dashboard</h3>
                            <p className="text-slate-400 text-sm mb-6">A Bento-styled dashboard providing high-density information without the clutter. Monitor stakes, votes, and winners in one unified view.</p>
                            <Button variant="secondary" className="border-slate-700 hover:bg-slate-800 group-hover:border-slate-500">
                                Open Dashboard
                            </Button>
                        </div>
                        <div className="flex-1 w-full bg-slate-800/50 rounded-2xl h-48 border border-white/5 p-4 flex flex-col gap-3 group-hover:bg-slate-800/80 transition-colors">
                            <div className="h-4 w-3/4 bg-slate-700 rounded-full animate-pulse" />
                            <div className="grid grid-cols-3 gap-2 flex-1">
                                <div className="bg-slate-700/50 rounded-lg" />
                                <div className="bg-slate-700/50 rounded-lg" />
                                <div className="bg-slate-700/50 rounded-lg" />
                            </div>
                            <div className="h-8 w-full bg-solana-purple/20 rounded-lg border border-solana-purple/20" />
                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-8 text-center text-slate-500 text-sm relative z-10">
                <p>&copy; 2025 SolBallot. Built on Solana.</p>
            </footer>
        </div>
    );
};
