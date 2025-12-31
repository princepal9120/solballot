import { useState, useEffect } from "react"
import idl from "./idl/idl.json"
import { Connection, PublicKey } from "@solana/web3.js"
import * as anchor from "@coral-xyz/anchor"

import { DashboardLayout } from "./components/layouts/DashboardLayout"
import { DashboardPage } from "./components/pages/DashboardPage"
import { ProposalsPage } from "./components/pages/ProposalsPage"
import { TreasuryPage } from "./components/pages/TreasuryPage"
import { SettingsPage } from "./components/pages/SettingsPage"
import { LandingPage } from "./components/LandingPage"

import "./App.css"

const programID = new PublicKey("GDBsWYr5VuhAADd9NwvDu7Q2Ri35qWaaenVVwYy81JdC")
const idlWithAddress = { ...idl, address: programID.toBase58() }

const network = "http://127.0.0.1:8899"
const connection = new Connection(network, "processed")

const getProvider = (): anchor.AnchorProvider | null => {
  if ("solana" in window) {
    const provider = new anchor.AnchorProvider(
      connection,
      (window as any).solana,
      { preflightCommitment: "processed" }
    )
    return provider
  }
  return null
}

type PageType = 'dashboard' | 'proposals' | 'treasury' | 'settings'

function App() {
  const [loading, setLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard')

  // Navigation handler with proper typing
  const handleNavigate = (page: string) => {
    if (['dashboard', 'proposals', 'treasury', 'settings'].includes(page)) {
      setCurrentPage(page as PageType)
    }
  }

  // Eager connect on mount
  useEffect(() => {
    const tryEagerConnect = async () => {
      try {
        const { solana } = window as any
        if (solana && solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true })
          setWalletAddress(response.publicKey.toString())
        }
      } catch (err) {
        // Silent fail - user hasn't connected before
      }
    }
    tryEagerConnect()
  }, [])

  const connectWallet = async () => {
    try {
      setLoading(true)
      const { solana } = window as any

      if (solana && solana.isPhantom) {
        const response = await solana.connect()
        setWalletAddress(response.publicKey.toString())
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻")
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Show landing page if not connected
  if (!walletAddress) {
    return <LandingPage connectWallet={connectWallet} isLoading={loading} />
  }

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <DashboardPage
            walletAddress={walletAddress}
            onNavigate={handleNavigate}
          />
        )
      case 'proposals':
        return <ProposalsPage />
      case 'treasury':
        return <TreasuryPage />
      case 'settings':
        return (
          <SettingsPage
            walletAddress={walletAddress}
          />
        )
      default:
        return <DashboardPage walletAddress={walletAddress} onNavigate={handleNavigate} />
    }
  }

  return (
    <DashboardLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      walletAddress={walletAddress}
      onConnectWallet={connectWallet}
      isLoadingWallet={loading}
    >
      {renderPage()}
    </DashboardLayout>
  )
}

export default App
