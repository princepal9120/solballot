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
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const pageInfo = pageTitles[currentPage] || pageTitles.dashboard

    // Close mobile menu when navigating
    React.useEffect(() => {
        setMobileMenuOpen(false)
    }, [currentPage])

    return (
        <div
            className="min-h-screen flex text-white font-sans overflow-hidden"
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

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Desktop & Mobile */}
            <div className={`
                fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:translate-x-0
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <Sidebar
                    currentPage={currentPage}
                    onNavigate={onNavigate}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen w-full relative">
                {/* Fixed Header */}
                <div className="sticky top-0 z-20 flex-shrink-0 w-full">
                    <MainHeader
                        title={pageInfo.title}
                        description={pageInfo.description}
                        walletAddress={walletAddress}
                        onConnectWallet={onConnectWallet}
                        isLoadingWallet={isLoadingWallet}
                        onMenuClick={() => setMobileMenuOpen(true)}
                    />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
