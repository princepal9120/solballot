import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { Wallet, ArrowDownCircle, PlusCircle, History, CheckCircle } from "lucide-react"



interface TreasuryPageProps {
    treasuryBalance?: number
    isInitialized?: boolean
    isLoading?: boolean
    onInitialize?: () => void
    onWithdraw?: (amount: number) => void
}

export const TreasuryPage: React.FC<TreasuryPageProps> = ({
    treasuryBalance = 0,
    isInitialized = false,
    isLoading = false,
    onInitialize,
    onWithdraw,
}) => {
    const [withdrawAmount, setWithdrawAmount] = React.useState("")
    const [isWithdrawing, setIsWithdrawing] = React.useState(false)
    const [isInitializing, setIsInitializing] = React.useState(false)

    const handleWithdraw = async () => {
        if (!withdrawAmount || !onWithdraw) return
        setIsWithdrawing(true)
        try {
            await onWithdraw(parseFloat(withdrawAmount))
            setWithdrawAmount("")
        } finally {
            setIsWithdrawing(false)
        }
    }

    const handleInitialize = async () => {
        if (!onInitialize) return
        setIsInitializing(true)
        try {
            await onInitialize()
        } finally {
            setIsInitializing(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Treasury Balance */}
                <Card className="md:col-span-2">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400">Treasury Balance</p>
                                {isLoading ? (
                                    <Skeleton className="h-10 w-32" />
                                ) : (
                                    <p className="text-3xl font-bold text-white">
                                        {treasuryBalance.toFixed(4)} <span className="text-lg text-slate-400">SOL</span>
                                    </p>
                                )}
                            </div>
                            <div className="p-4 rounded-2xl bg-[#9b87f5]/10 border border-[#9b87f5]/20">
                                <Wallet className="w-8 h-8 text-[#9b87f5]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Status */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-sm text-slate-400">Status</p>
                                {isLoading ? (
                                    <Skeleton className="h-6 w-20" />
                                ) : (
                                    <Badge variant={isInitialized ? "success" : "warning"}>
                                        {isInitialized ? "Initialized" : "Not Initialized"}
                                    </Badge>
                                )}
                            </div>
                            <div className={`p-3 rounded-xl ${isInitialized ? 'bg-green-500/10 border-green-500/20' : 'bg-amber-500/10 border-amber-500/20'} border`}>
                                <CheckCircle className={`w-5 h-5 ${isInitialized ? 'text-green-400' : 'text-amber-400'}`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Initialize Treasury */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PlusCircle className="w-5 h-5 text-[#9b87f5]" />
                            Initialize Treasury
                        </CardTitle>
                        <CardDescription>
                            Set up the DAO treasury account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-slate-400">
                            Initialize the treasury to enable token sales and governance funding.
                        </p>
                        <Button
                            className="w-full"
                            onClick={handleInitialize}
                            isLoading={isInitializing}
                            disabled={isInitialized}
                        >
                            {isInitialized ? "Already Initialized" : "Initialize Treasury"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Withdraw SOL */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ArrowDownCircle className="w-5 h-5 text-green-400" />
                            Withdraw SOL
                        </CardTitle>
                        <CardDescription>
                            Withdraw funds from treasury (Admin only)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            label="Amount (SOL)"
                            type="number"
                            placeholder="0.00"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            disabled={!isInitialized}
                        />
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={handleWithdraw}
                            isLoading={isWithdrawing}
                            disabled={!isInitialized || !withdrawAmount}
                        >
                            Withdraw
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction History Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="w-5 h-5 text-slate-400" />
                        Transaction History
                    </CardTitle>
                    <CardDescription>
                        Recent treasury transactions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <History className="w-12 h-12 text-slate-500 mb-4" />
                        <h3 className="text-lg font-medium text-white">No transactions yet</h3>
                        <p className="text-sm text-slate-400 mt-1">
                            Treasury transactions will appear here
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
