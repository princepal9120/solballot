import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input, Textarea } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty } from "@/components/ui/Table"
import { SkeletonTable } from "@/components/ui/Skeleton"
import { Search, Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react"



interface Proposal {
    id: number
    title: string
    status: 'active' | 'ended' | 'pending'
    votes: { yes: number; no: number }
    endTime: Date
}

interface ProposalsPageProps {
    proposals?: Proposal[]
    isLoading?: boolean
    onCreateProposal?: (title: string, description: string) => void
    onVote?: (proposalId: number, vote: boolean) => void
}

export const ProposalsPage: React.FC<ProposalsPageProps> = ({
    proposals = [],
    isLoading = false,
    onCreateProposal,
    onVote,
}) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [newTitle, setNewTitle] = React.useState("")
    const [newDescription, setNewDescription] = React.useState("")
    const [isCreating, setIsCreating] = React.useState(false)

    // Filter proposals based on tab and search
    const activeProposals = proposals.filter(p => p.status === 'active')
    const endedProposals = proposals.filter(p => p.status === 'ended')

    const filteredProposals = (list: Proposal[]) =>
        list.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))

    const handleCreate = async () => {
        if (!newTitle.trim() || !onCreateProposal) return
        setIsCreating(true)
        try {
            await onCreateProposal(newTitle, newDescription)
            setNewTitle("")
            setNewDescription("")
        } finally {
            setIsCreating(false)
        }
    }

    const getStatusBadge = (status: Proposal['status']) => {
        switch (status) {
            case 'active':
                return <Badge variant="success">Active</Badge>
            case 'ended':
                return <Badge variant="outline">Ended</Badge>
            case 'pending':
                return <Badge variant="warning">Pending</Badge>
        }
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Search Bar */}
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search proposals..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            leftIcon={<Search className="w-4 h-4" />}
                            className="flex-1"
                        />
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="active">
                        <TabsList>
                            <TabsTrigger value="active">
                                Active ({activeProposals.length})
                            </TabsTrigger>
                            <TabsTrigger value="all">
                                All ({proposals.length})
                            </TabsTrigger>
                            <TabsTrigger value="ended">
                                Ended ({endedProposals.length})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="active">
                            {isLoading ? (
                                <SkeletonTable rows={3} />
                            ) : filteredProposals(activeProposals).length === 0 ? (
                                <Card>
                                    <TableEmpty
                                        icon={<FileText className="w-12 h-12" />}
                                        title="No active proposals"
                                        description="Create a new proposal to get started"
                                    />
                                </Card>
                            ) : (
                                <ProposalTable
                                    proposals={filteredProposals(activeProposals)}
                                    getStatusBadge={getStatusBadge}
                                    onVote={onVote}
                                />
                            )}
                        </TabsContent>

                        <TabsContent value="all">
                            {isLoading ? (
                                <SkeletonTable rows={5} />
                            ) : filteredProposals(proposals).length === 0 ? (
                                <Card>
                                    <TableEmpty
                                        icon={<FileText className="w-12 h-12" />}
                                        title="No proposals found"
                                        description="Try adjusting your search"
                                    />
                                </Card>
                            ) : (
                                <ProposalTable
                                    proposals={filteredProposals(proposals)}
                                    getStatusBadge={getStatusBadge}
                                    onVote={onVote}
                                />
                            )}
                        </TabsContent>

                        <TabsContent value="ended">
                            {isLoading ? (
                                <SkeletonTable rows={3} />
                            ) : filteredProposals(endedProposals).length === 0 ? (
                                <Card>
                                    <TableEmpty
                                        icon={<Clock className="w-12 h-12" />}
                                        title="No ended proposals"
                                        description="Ended proposals will appear here"
                                    />
                                </Card>
                            ) : (
                                <ProposalTable
                                    proposals={filteredProposals(endedProposals)}
                                    getStatusBadge={getStatusBadge}
                                />
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Create Proposal Sidebar */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="w-5 h-5 text-[#9b87f5]" />
                                Create Proposal
                            </CardTitle>
                            <CardDescription>
                                Submit a new governance proposal
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Input
                                label="Title"
                                placeholder="Proposal title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                            <Textarea
                                label="Description"
                                placeholder="Describe your proposal..."
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                            <Button
                                className="w-full"
                                onClick={handleCreate}
                                isLoading={isCreating}
                                disabled={!newTitle.trim()}
                            >
                                Submit Proposal
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

// Proposal Table Component
interface ProposalTableProps {
    proposals: Proposal[]
    getStatusBadge: (status: Proposal['status']) => React.ReactNode
    onVote?: (proposalId: number, vote: boolean) => void
}

const ProposalTable: React.FC<ProposalTableProps> = ({ proposals, getStatusBadge, onVote }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Votes</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                    <TableCell className="font-mono">#{proposal.id}</TableCell>
                    <TableCell className="font-medium">{proposal.title}</TableCell>
                    <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-400">{proposal.votes.yes} Yes</span>
                            <span className="text-slate-500">/</span>
                            <span className="text-red-400">{proposal.votes.no} No</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        {proposal.status === 'active' && onVote && (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onVote(proposal.id, true)}
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Yes
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onVote(proposal.id, false)}
                                >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    No
                                </Button>
                            </div>
                        )}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
)
