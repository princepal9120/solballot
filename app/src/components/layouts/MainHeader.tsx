import * as React from "react"
import { Wallet, Bell } from "lucide-react"
import { Button } from "@/components/ui/Button"





interface MainHeaderProps {
    title: string
    description?: string
    walletAddress?: string | null
    onConnectWallet: () => void
    isLoadingWallet?: boolean
}

export const MainHeader: React.FC<MainHeaderProps> = ({
    title,
    description,
    walletAddress,
    onConnectWallet,
    isLoadingWallet = false,
}) => {
    return (
        <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
            {/* Left: Title & Description */}
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-white">{title}</h1>
                {description && (
                    <p className="text-sm text-slate-400">{description}</p>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Network Status */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-slate-400">Mainnet</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#9b87f5] rounded-full" />
                </button>

                {/* Wallet */}
                {walletAddress ? (
                    <div className="flex items-center gap-3 p-1.5 pr-4 pl-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b87f5] to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                            {walletAddress.slice(0, 2)}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs font-mono text-white font-medium">
                                {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <Button
                        onClick={onConnectWallet}
                        isLoading={isLoadingWallet}
                        size="sm"
                    >
                        <Wallet className="w-4 h-4" />
                        Connect
                    </Button>
                )}
            </div>
        </header>
    )
}
