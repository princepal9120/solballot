import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { UserX, Trophy, XCircle, AlertTriangle, Shield } from "lucide-react"




interface SettingsPageProps {
    walletAddress: string
    onCloseVoter?: () => void
    onCloseProposal?: (proposalId: number) => void
    onPickWinner?: (proposalId: number) => void
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
    walletAddress,
    onCloseVoter,
    onCloseProposal,
    onPickWinner,
}) => {
    const [proposalIdForClose, setProposalIdForClose] = React.useState("")
    const [proposalIdForWinner, setProposalIdForWinner] = React.useState("")
    const [isClosingVoter, setIsClosingVoter] = React.useState(false)
    const [isClosingProposal, setIsClosingProposal] = React.useState(false)
    const [isPickingWinner, setIsPickingWinner] = React.useState(false)

    const handleCloseVoter = async () => {
        if (!onCloseVoter) return
        setIsClosingVoter(true)
        try {
            await onCloseVoter()
        } finally {
            setIsClosingVoter(false)
        }
    }

    const handleCloseProposal = async () => {
        if (!proposalIdForClose || !onCloseProposal) return
        setIsClosingProposal(true)
        try {
            await onCloseProposal(parseInt(proposalIdForClose))
            setProposalIdForClose("")
        } finally {
            setIsClosingProposal(false)
        }
    }

    const handlePickWinner = async () => {
        if (!proposalIdForWinner || !onPickWinner) return
        setIsPickingWinner(true)
        try {
            await onPickWinner(parseInt(proposalIdForWinner))
            setProposalIdForWinner("")
        } finally {
            setIsPickingWinner(false)
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Account Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#9b87f5]" />
                    <h2 className="text-lg font-semibold text-white">Account Management</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Connected Wallet */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Connected Wallet</CardTitle>
                            <CardDescription>Your current wallet address</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9b87f5] to-blue-600 flex items-center justify-center text-sm font-bold text-white">
                                    {walletAddress.slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-mono text-sm text-white truncate">{walletAddress}</p>
                                    <Badge variant="success" className="mt-1">Connected</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Close Voter Account */}
                    <Card className="border-amber-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-400">
                                <UserX className="w-5 h-5" />
                                Close Voter Account
                            </CardTitle>
                            <CardDescription>
                                Permanently close your voter account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-amber-300">
                                    This action is irreversible. You will lose all voting history and allocated tokens.
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={handleCloseVoter}
                                isLoading={isClosingVoter}
                            >
                                <UserX className="w-4 h-4 mr-2" />
                                Close Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Admin Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-400" />
                    <h2 className="text-lg font-semibold text-white">Admin Tools</h2>
                    <Badge variant="warning">Admin Only</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Close Proposal */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-red-400" />
                                Close Proposal
                            </CardTitle>
                            <CardDescription>
                                End a proposal before its deadline
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                label="Proposal ID"
                                type="number"
                                placeholder="Enter proposal ID"
                                value={proposalIdForClose}
                                onChange={(e) => setProposalIdForClose(e.target.value)}
                            />
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={handleCloseProposal}
                                isLoading={isClosingProposal}
                                disabled={!proposalIdForClose}
                            >
                                Close Proposal
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Pick Winner */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-400" />
                                Pick Winner
                            </CardTitle>
                            <CardDescription>
                                Finalize voting and pick the winner
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                label="Proposal ID"
                                type="number"
                                placeholder="Enter proposal ID"
                                value={proposalIdForWinner}
                                onChange={(e) => setProposalIdForWinner(e.target.value)}
                            />
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={handlePickWinner}
                                isLoading={isPickingWinner}
                                disabled={!proposalIdForWinner}
                            >
                                <Trophy className="w-4 h-4 mr-2" />
                                Pick Winner
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
