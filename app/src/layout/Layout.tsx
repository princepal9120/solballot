import React, { ReactNode } from 'react';
import { LayoutDashboard, Wallet, Settings, FileText } from 'lucide-react';
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
        <div
            className="min-h-screen flex flex-col md:flex-row text-gray-200 font-sans"
            style={{
                background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
            }}
        >
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#150d27',
                        color: '#f8fafc',
                        border: '1px solid rgba(255,255,255,0.1)',
                    },
                    success: {
                        iconTheme: {
                            primary: '#14F195',
                            secondary: '#0a0613',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#EF4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 p-6 flex flex-col gap-8 border-r border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 h-screen">
                <div className="flex items-center gap-3 px-2">
                    <img src="/logo.png" alt="SolBallot Logo" className="w-8 h-8 rounded-lg shadow-lg shadow-[#9b87f5]/20" />
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
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentPage === item.id
                                ? 'bg-[#9b87f5]/20 text-white border border-[#9b87f5]/30'
                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                                }`}
                        >
                            <item.icon className={`w-4 h-4 transition-colors ${currentPage === item.id ? 'text-[#9b87f5]' : 'text-gray-500 group-hover:text-gray-300'
                                }`} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/10">
                    <button
                        onClick={() => setCurrentPage('settings')}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${currentPage === 'settings'
                            ? 'bg-[#9b87f5]/20 text-white border border-[#9b87f5]/30'
                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent'
                            }`}
                    >
                        <Settings className={`w-4 h-4 transition-colors ${currentPage === 'settings' ? 'text-[#9b87f5]' : 'text-gray-500 group-hover:text-gray-300'
                            }`} />
                        Settings
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
                    <div className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span>Mainnet Beta</span>
                    </div>

                    {walletAddress ? (
                        <div className="flex items-center gap-3 p-1.5 pr-4 pl-2 rounded-full bg-white/5 border border-white/10 transition-colors hover:border-white/20">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b87f5] to-blue-600 flex items-center justify-center text-xs font-bold text-white">
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
                            className="bg-[#9b87f5] hover:bg-[#8a76e4] text-white font-semibold shadow-lg shadow-[#9b87f5]/20"
                        >
                            <Wallet className="mr-2 w-4 h-4" />
                            Connect Wallet
                        </Button>
                    )}
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
};
