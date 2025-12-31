import { useState, useEffect } from "react";
import idl from "./idl/idl.json";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Layout } from "./layout/Layout";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";

// Component Imports (We will migrate these next, so suppressing errors for now if they are still JSX)

import InitializeTreasury from "./components/InitializeTreasury";

import BuyTokens from "./components/BuyTokens";

import RegisterProposal from "./components/RegisterProposal";

import Vote from "./components/Vote";
import PickWinner from "./components/PickWinner";
import WithdrawSol from "./components/WithdrawSol";
import CloseProposal from "./components/CloseProposal";

import TokenBalance from "./components/TokenBalance";

import VoterInfo from "./components/VoterInfo";

import AllProposals from "./components/AllProposals";

import ProposalInfo from "./components/ProposalInfo";

import TreasuryInfo from "./components/TreasuryInfo";
import { LandingPage } from "./components/LandingPage";

import "./App.css";
import CloseVoter from "./components/CloseVoter";

const programID = new PublicKey("GDBsWYr5VuhAADd9NwvDu7Q2Ri35qWaaenVVwYy81JdC");
const idlWithAddress = { ...idl, address: programID.toBase58() };

// Network configuration
const network = "http://127.0.0.1:8899";
const connection = new Connection(network, "processed");

// getProvider function
const getProvider = (): anchor.AnchorProvider | null => {
  if ("solana" in window) {
    const provider = new anchor.AnchorProvider(
      connection,
      (window as any).solana,
      { preflightCommitment: "processed" }
    );
    return provider;
  }
  return null;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<
    "user" | "admin" | "settings" | "proposals"
  >("user");

  // Eager connect on mount
  useEffect(() => {
    const tryEagerConnect = async () => {
      try {
        const { solana } = window as any;
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          setWalletAddress(response.publicKey.toString());
        }
      } catch (err) {
        // User hasn't connected before, or rejected. Silent fail is expected.
      }
    };
    tryEagerConnect();
  }, []);

  // Connect Wallet
  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      const { solana } = window as any;

      if (solana && solana.isPhantom) {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to connect wallet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const sharedProps = {
    walletAddress,
    idlWithAddress,
    getProvider,
  };

  const sharedPropsWithConn = {
    ...sharedProps,
    connection,
  };

  if (!walletAddress) {
    return <LandingPage connectWallet={connectWallet} isLoading={loading} />;
  }

  return (
    <Layout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      walletAddress={walletAddress}
      connectWallet={connectWallet}
      isLoadingWallet={loading}
    >
      {/* ... (rest of the dashboard logic) */}
      {currentPage === "user" && (
        <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          {/* Section Header */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Dashboard
            </h2>
            <p className="text-slate-400 text-sm">
              Welcome back! Here's an overview of your governance activity.
            </p>
          </div>

          {/* Top Row: Stats & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TokenBalance {...sharedPropsWithConn} />
            <VoterInfo {...sharedProps} />
            <Card className="flex flex-col justify-between p-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-white font-medium text-sm">
                  Action Center
                </h3>
                <p className="text-xs text-slate-400">
                  Quickly access key actions
                </p>
              </div>
              <div className="flex-1 flex flex-col justify-end gap-2 mt-4">
                <Button
                  size="sm"
                  onClick={() => setCurrentPage("proposals")}
                  className="w-full bg-[#9b87f5] hover:bg-[#8a76e4] text-white"
                >
                  View Proposals
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content: Buying & Voting */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vote & Lookup column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col space-y-2 mb-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Cast Your Vote
                </h2>
                <p className="text-slate-400 text-sm">
                  Enter a Proposal ID to cast your vote directly.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Vote {...sharedProps} />
                <ProposalInfo {...sharedProps} />
              </div>
            </div>

            {/* Buy Tokens side panel */}
            <div className="h-full">
              <BuyTokens {...sharedPropsWithConn} />
            </div>
          </div>
        </div>
      )}

      {currentPage === "proposals" && (
        <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500">
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Governance Proposals
              </h2>
              <p className="text-slate-400">
                View active proposals, create new ones, and track governance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* All Proposals List */}
            <div className="lg:col-span-2">
              <AllProposals {...sharedProps} />
            </div>

            {/* Create Proposal */}
            <div className="space-y-6">
              <RegisterProposal {...sharedProps} />
            </div>
          </div>
        </div>
      )}

      {currentPage === "admin" && (
        <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
          <div className="flex flex-col space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Treasury Management
            </h2>
            <p className="text-slate-400">
              Initialize and manage the DAO treasury.
            </p>
          </div>

          <TreasuryInfo {...sharedProps} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <InitializeTreasury {...sharedProps} />
            <WithdrawSol {...sharedProps} />
          </div>
        </div>
      )}

      {currentPage === "settings" && (
        <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
          <div className="flex flex-col space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Settings & Tools
            </h2>
            <p className="text-slate-400">
              Manage your account and perform advanced proposal actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">
                Account Management
              </h3>
              <CloseVoter {...sharedProps} />
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-200 border-b border-slate-800 pb-2">
                Proposal Administration
              </h3>
              <CloseProposal {...sharedProps} />
              <PickWinner {...sharedProps} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;
