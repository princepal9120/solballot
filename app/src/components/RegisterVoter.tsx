import { useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { Button } from '@/components/ui/Button';
import { ProgramProps } from '@/types';
import { UserPlus, UserCheck } from 'lucide-react';

const RegisterVoter = ({ walletAddress, idlWithAddress, getProvider }: ProgramProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const registerVoter = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet");
            return;
        }

        setIsLoading(true);
        try {
            const provider = getProvider();
            if (!provider) throw new Error("Provider not found");
            const program = new anchor.Program(idlWithAddress, provider);

            const [voterPda] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("voter"),
                    provider.wallet.publicKey.toBuffer()
                ],
                program.programId
            );

            // Check if already registered
            try {
                await program.account.voter.fetch(voterPda);
                alert("You are already registered!");
                setIsRegistered(true);
                setIsLoading(false);
                return;
            } catch (e) {
                // Expected if not registered
            }

            await program.methods.initVoter()
                .accounts({
                    voterAccount: voterPda,
                    authority: provider.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                } as any)
                .rpc();

            alert("Voter Registered Successfully!");
            setIsRegistered(true);
        } catch (error: any) {
            console.error("Error registering voter:", error);
            alert("Failed to register voter: " + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={registerVoter}
            className="w-full flex items-center justify-center gap-2"
            variant={isRegistered ? "ghost" : "primary"}
            disabled={isRegistered}
            isLoading={isLoading}
        >
            {isRegistered ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            {isRegistered ? 'Registered Voter' : 'Register as Voter'}
        </Button>
    )
}

export default RegisterVoter;
