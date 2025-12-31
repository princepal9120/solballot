import React from 'react';
import { Button } from './ui/Button';
import Globe3D from './blocks/hero';
import { Features } from './blocks/features-8';

interface LandingPageProps {
    connectWallet: () => void;
    isLoading: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ connectWallet, isLoading }) => {
    return (
        <div className="min-h-screen bg-[#0a0613] text-slate-50 selection:bg-solana-green/30 relative overflow-x-hidden">
            {/* Navigation (Simple version for landing) */}
            <nav className="fixed w-full z-50 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0 top-0 backdrop-blur-sm">
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

            <Globe3D onConnect={connectWallet} />

            <Features />

            <footer className="py-8 text-center text-slate-500 text-sm relative z-10 bg-[#0a0613]">
                <p>&copy; 2025 SolBallot. Built on Solana.</p>
            </footer>
        </div>
    );
};
