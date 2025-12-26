import { PublicKey, Connection } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";

export interface ProgramProps {
    walletAddress: string | null;
    idlWithAddress: any; // Using any for now as IDL type is complex
    getProvider: () => anchor.AnchorProvider | null;
}

export interface ProgramPropsWithConnection extends ProgramProps {
    connection: Connection;
}
