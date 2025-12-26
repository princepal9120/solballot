import React, { ReactNode } from 'react';
import { LayoutDashboard, Wallet, Settings, Vote, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
    children: ReactNode;
    currentPage: 'user' | 'admin' | 'settings' | 'proposals';
    setCurrentPage: (page: 'user' | 'admin' | 'settings' | 'proposals') => void;
    walletAddress: string | null;
    connectWallet: () => void;
    isLoadingWallet: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    currentPage,
    setCurrentPage,
    walletAddress,
    connectWallet,
    isLoadingWallet
}) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row max-w-[1600px] mx-auto bg-solana-base text-gray-200 font-sans">
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#0a0a0f',
                        color: '#f8fafc',
                        border: '1px solid #1e293b',
                    },
                    success: {
                        iconTheme: {
                            primary: '#14F195', // solana-cyan
                            secondary: '#0a0a0f',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444', // solana-red
                            secondary: '#fff',
                        },
                    },
                }}
            />
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 p-6 flex flex-col gap-8 border-r border-solana-surface bg-solana-base sticky top-0 h-screen">
                <div className="flex items-center gap-3 px-2">
                    <img src="/logo.png" alt="SolBallot Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-solana-purple/20" />
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        SolBallot
                    </h1>
                </div>

                <nav className="flex-1 space-y-1">
                    {[
                        { id: 'user', label: 'Dashboard', icon: LayoutDashboard },
                        { id: 'proposals', label: 'Proposals', icon: FileText },
                        { id: 'admin', label: 'Treasury', icon: Wallet },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-lg border-l-2 transition-all duration-200 group ${currentPage === item.id
                                ? 'border-solana-purple bg-solana-surface/50 text-white'
                                : 'border-transparent text-gray-400 hover:bg-solana-surface/30 hover:text-gray-200'
                                }`}
                        >
                            <item.icon className={`w-4 h-4 transition-colors ${currentPage === item.id ? 'text-solana-purple' : 'text-gray-500 group-hover:text-gray-300'
                                }`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-solana-surface">
                    <button
                        onClick={() => setCurrentPage('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-r-lg border-l-2 transition-all duration-200 group ${currentPage === 'settings'
                            ? 'border-solana-purple bg-solana-surface/50 text-white'
                            : 'border-transparent text-gray-400 hover:bg-solana-surface/30 hover:text-gray-200'
                            }`}
                    >
                        <Settings className={`w-4 h-4 transition-colors ${currentPage === 'settings' ? 'text-solana-purple' : 'text-gray-500 group-hover:text-gray-300'
                            }`} />
                        Settings
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden bg-solana-base">
                {/* Header */}
                <header className="h-20 border-b border-solana-surface bg-solana-base/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
                    <div className="text-sm text-gray-400">
                        <span className="text-solana-green">●</span> Mainnet Beta
                    </div>

                    {walletAddress ? (
                        <div className="flex items-center gap-3 p-1.5 pr-4 pl-2 rounded-full bg-solana-surface border border-slate-800 transition-colors hover:border-slate-700">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-solana-purple to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                {walletAddress.slice(0, 2)}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs font-mono text-gray-300 font-medium">
                                    {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Button
                            onClick={connectWallet}
                            isLoading={isLoadingWallet}
                            className="bg-solana-purple hover:bg-purple-700 text-white font-semibold shadow-lg shadow-solana-purple/20"
                        >
                            <Wallet className="mr-2 w-4 h-4" />
                            Connect Wallet
                        </Button>
                    )}
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-solana-surface scrollbar-track-transparent">
                    {children}
                </div>
            </main>
        </div>
    );
};
