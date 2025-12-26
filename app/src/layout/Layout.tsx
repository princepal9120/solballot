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
        <div className="min-h-screen flex flex-col md:flex-row max-w-[1400px] mx-auto">
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1e293b',
                        color: '#fff',
                        border: '1px solid #334155',
                    },
                    success: {
                        iconTheme: {
                            primary: '#14b8a6', // protocol-teal
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444', // red-500
                            secondary: '#fff',
                        },
                    },
                }}
            />
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 p-6 flex flex-col gap-8 border-r border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3">
                    <div className="bg-protocol-blue p-2 rounded-lg shadow-sm">
                        <Vote className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-50 tracking-tight">
                        SolBallot
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <Button
                        variant={currentPage === 'user' ? 'primary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setCurrentPage('user')}
                    >
                        <LayoutDashboard className="mr-2 w-4 h-4" />
                        Dashboard
                    </Button>
                    <Button
                        variant={currentPage === 'proposals' ? 'primary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setCurrentPage('proposals')}
                    >
                        <FileText className="mr-2 w-4 h-4" />
                        Proposals
                    </Button>
                    <Button
                        variant={currentPage === 'admin' ? 'primary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setCurrentPage('admin')}
                    >
                        <Wallet className="mr-2 w-4 h-4" />
                        Treasury
                    </Button>
                </nav>

                <div className="pt-6 border-t border-slate-800">
                    <Button
                        variant={currentPage === 'settings' ? 'primary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setCurrentPage('settings')}
                    >
                        <Settings className="mr-2 w-4 h-4" />
                        Settings
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 px-8 flex items-center justify-end">
                    {walletAddress ? (
                        <div className="flex items-center gap-2 p-2 px-3 rounded-lg bg-slate-800 border border-slate-700">
                            <div className="w-2 h-2 rounded-full bg-protocol-teal animate-pulse" />
                            <p className="text-sm font-mono text-slate-300">
                                {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                            </p>
                        </div>
                    ) : (
                        <Button
                            onClick={connectWallet}
                            isLoading={isLoadingWallet}
                            className="bg-protocol-blue hover:bg-blue-600 text-white shadow-sm"
                        >
                            <Wallet className="mr-2 w-4 h-4" />
                            Connect Wallet
                        </Button>
                    )}
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
