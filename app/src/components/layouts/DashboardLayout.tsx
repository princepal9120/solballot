import * as React from "react"
import { Sidebar } from "./Sidebar"
import { MainHeader } from "./MainHeader"
import { Toaster } from "react-hot-toast"



const pageTitles: Record<string, { title: string; description: string }> = {
    dashboard: { title: "Dashboard", description: "Overview of your governance activity" },
    proposals: { title: "Proposals", description: "View and create governance proposals" },
    treasury: { title: "Treasury", description: "Manage DAO treasury and funds" },
    settings: { title: "Settings", description: "Account and admin tools" },
}

interface DashboardLayoutProps {
    children: React.ReactNode
    currentPage: string
    onNavigate: (page: string) => void
    walletAddress?: string | null
    onConnectWallet: () => void
    isLoadingWallet?: boolean
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    currentPage,
    onNavigate,
    walletAddress,
    onConnectWallet,
    isLoadingWallet = false,
}) => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
    const pageInfo = pageTitles[currentPage] || pageTitles.dashboard

    return (
        <div
            className="min-h-screen flex text-white font-sans"
            style={{
                background: "linear-gradient(135deg, #0a0613 0%, #150d27 100%)",
            }}
        >
            {/* Toast Notifications */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#150d27',
                        color: '#f8fafc',
                        border: '1px solid rgba(255,255,255,0.1)',
                    },
                    success: {
                        iconTheme: { primary: '#14F195', secondary: '#0a0613' },
                    },
                    error: {
                        iconTheme: { primary: '#EF4444', secondary: '#fff' },
                    },
                }}
            />

            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                onNavigate={onNavigate}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Fixed Header */}
                <div className="sticky top-0 z-20 flex-shrink-0">
                    <MainHeader
                        title={pageInfo.title}
                        description={pageInfo.description}
                        walletAddress={walletAddress}
                        onConnectWallet={onConnectWallet}
                        isLoadingWallet={isLoadingWallet}
                    />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
