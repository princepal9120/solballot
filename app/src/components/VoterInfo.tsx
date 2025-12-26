import React from 'react'
import { SEEDS } from '../constants/constants';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { useState, useEffect } from 'react';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { User, CheckCircle2, AlertCircle } from 'lucide-react';

interface VoterData {
    voterId: PublicKey;
    proposalVoted: number;
}

const VoterInfo = ({ walletAddress }: { walletAddress: string | null; idlWithAddress: any; getProvider: any }) => {
    const [voterData, setVoterData] = useState<VoterData | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchVoterInfo = async () => {
        if (!walletAddress) {
            return;
        }
        // Existing logic for fetching voter info would go here
        // For now, let's simulate some data and registration status
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            const simulatedVoterData = {
                voterId: new PublicKey("11111111111111111111111111111111"), // Placeholder
                proposalVoted: 1
            };
            setVoterData(simulatedVoterData);
            setIsRegistered(true); // Simulate registered status
        } catch (error) {
            console.error("Error fetching voter info:", error);
            setIsRegistered(false);
            setVoterData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVoterInfo();
    }, [walletAddress]);

    return (
        <Card className="flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <h2 className="text-sm font-medium text-gray-400">Voter Info</h2>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center py-2">
                {isRegistered ? ( // Changed from voterData to isRegistered for the badge logic
                    <div className="flex flex-col items-center gap-2">
                        <span className="bg-protocol-teal/20 text-protocol-teal text-xs font-bold px-3 py-1 rounded-full border border-protocol-teal/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Registered
                        </span>
                        <div className="text-center mt-2">
                            <p className="text-xs text-gray-500 font-mono">
                                {walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}
                            </p>
                            {voterData && ( // Display voter data if registered and available
                                <>
                                    <p className="text-xs text-gray-500">Voter ID: {voterData.voterId.toBase58().slice(0, 20)}...</p>
                                    <p className="text-xs text-gray-500">Proposal Voted: {voterData.proposalVoted === 0 ? "Not voted yet" : voterData.proposalVoted}</p>
                                </>
                            )}
                        </div>
                    </div>
                ) : (
                    <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Not Registered
                    </span>
                )}
            </div>

            <Button
                variant="secondary"
                className="w-full mt-4 bg-protocol-blue/20 hover:bg-protocol-blue/30 text-protocol-blue border-transparent"
                onClick={fetchVoterInfo}
                isLoading={loading}
            >
                Refresh
            </Button>
        </Card>
    )
}

export default VoterInfo;
