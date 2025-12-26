import { useState, useEffect } from 'react'
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { Building2, Copy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreasuryData {
    treasuryConfig: string;
    solVault: string;
    xMint: string;
    treasuryTokenAccount?: string;
    authority?: string;
    solPrice?: string;
    tokensPerPurchase?: string;
    isInitialized: boolean;
}

const TreasuryInfo = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [treasuryInfo, setTreasuryInfo] = useState<TreasuryData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTreasuryInfo = async () => {
        if (!walletAddress) return;

        setLoading(true);
        setError(null);

        try {
            const provider = getProvider();
            if (!provider) return;
            const program = new anchor.Program(idlWithAddress, provider);

            const [treasuryConfigPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("treasury_config")],
                program.programId
            );

            const [solVaultPda] = PublicKey.findProgramAddressSync(
                [Buffer.from("sol_vault")],
                program.programId
            );

            try {
                const config = await program.account.treasuryConfig.fetch(treasuryConfigPda) as any;
                setTreasuryInfo({
                    treasuryConfig: treasuryConfigPda.toString(),
                    solVault: solVaultPda.toString(),
                    xMint: config.xMint.toString(),
                    treasuryTokenAccount: config.treasuryTokenAccount.toString(),
                    authority: config.authority.toString(),
                    solPrice: config.solPrice.toString(),
                    tokensPerPurchase: config.tokensPerPurchase.toString(),
                    isInitialized: true
                });
            } catch (e: any) {
                if (e.message.includes("Account does not exist") || e.message.includes("Could not find account")) {
                    setTreasuryInfo({
                        isInitialized: false,
                        treasuryConfig: treasuryConfigPda.toString(),
                        solVault: solVaultPda.toString(),
                        xMint: 'Not Initialized'
                    });
                } else {
                    throw e;
                }
            }
        } catch (err: any) {
            console.error("Error fetching treasury info:", err);
            setError("Failed to fetch treasury info");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (walletAddress) {
            fetchTreasuryInfo();
        }
    }, [walletAddress]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add toast here
    };

    const shortenAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 8)}...${address.slice(-8)}`;
    };

    const lamportsToSol = (lamports: string) => {
        return (Number(lamports) / 1_000_000_000).toFixed(4);
    };

    const rawToTokens = (raw: string) => {
        return (Number(raw) / 1_000_000).toFixed(2);
    };

    if (!walletAddress) {
        return (
            <Card className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
                <Building2 className="w-12 h-12 mb-4 opacity-50" />
                <p>Connect wallet to view treasury info</p>
            </Card>
        );
    }

    return (
        <Card className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-solana-purple" />
                    <h2 className="text-xl font-bold">Treasury Information</h2>
                </div>
                <Button size="sm" variant="ghost" onClick={fetchTreasuryInfo} isLoading={loading}>
                    <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                </Button>
            </div>

            {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

            {treasuryInfo && (
                <div className="space-y-6">
                    <div className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border",
                        treasuryInfo.isInitialized
                            ? "bg-green-500/10 border-green-500/20 text-green-500"
                            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                    )}>
                        {treasuryInfo.isInitialized ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-medium">{treasuryInfo.isInitialized ? 'Treasury Initialized' : 'Not Initialized'}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InfoItem label="Treasury Config" value={treasuryInfo.treasuryConfig} onCopy={copyToClipboard} shorten={shortenAddress} />
                        <InfoItem label="SOL Vault" value={treasuryInfo.solVault} onCopy={copyToClipboard} shorten={shortenAddress} />
                        <InfoItem label="Token Mint" value={treasuryInfo.xMint} onCopy={copyToClipboard} shorten={shortenAddress} />

                        {treasuryInfo.isInitialized && (
                            <>
                                <InfoItem label="Token Account" value={treasuryInfo.treasuryTokenAccount || ''} onCopy={copyToClipboard} shorten={shortenAddress} />
                                <InfoItem label="Authority" value={treasuryInfo.authority || ''} onCopy={copyToClipboard} shorten={shortenAddress} />

                                <div className="md:col-span-2 grid grid-cols-2 gap-4 mt-2">
                                    <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">SOL Price</p>
                                        <p className="text-xl font-bold text-white">{lamportsToSol(treasuryInfo.solPrice || '0')} SOL</p>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-lg border border-white/5 text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tokens/Purchase</p>
                                        <p className="text-xl font-bold text-white">{rawToTokens(treasuryInfo.tokensPerPurchase || '0')}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
};

const InfoItem = ({ label, value, onCopy, shorten }: { label: string, value: string, onCopy: (t: string) => void, shorten: (t: string) => string }) => (
    <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
        <span className="text-xs text-gray-400 font-medium">{label}</span>
        <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-gray-200">{shorten(value)}</span>
            <button
                onClick={() => onCopy(value)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
            >
                <Copy className="w-3 h-3 text-gray-400" />
            </button>
        </div>
    </div>
);

export default TreasuryInfo;
