import * as React from "react"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    FileText,
    Wallet,
    Settings,
    PanelLeftClose,
    PanelLeft
} from "lucide-react"

interface NavItem {
    id: string
    label: string
    icon: React.ElementType
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'proposals', label: 'Proposals', icon: FileText },
    { id: 'treasury', label: 'Treasury', icon: Wallet },
]

interface SidebarProps {
    currentPage: string
    onNavigate: (page: string) => void
    collapsed?: boolean
    onToggleCollapse?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
    currentPage,
    onNavigate,
    collapsed = false,
    onToggleCollapse,
}) => {
    return (
        <aside
            className={cn(
                "flex flex-col h-screen sticky top-0 border-r border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header with Logo and Collapse Button */}
            <div className={cn(
                "flex items-center justify-between p-6 border-b border-white/10",
                collapsed && "justify-center px-4"
            )}>
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <img
                        src="/logo.png"
                        alt="SolBallot"
                        className="w-8 h-8 rounded-lg shadow-lg shadow-[#9b87f5]/20"
                    />
                    {!collapsed && (
                        <span className="text-xl font-bold text-white tracking-tight">
                            SolBallot
                        </span>
                    )}
                </div>

                {/* Collapse Toggle - Top Right */}
                {onToggleCollapse && !collapsed && (
                    <button
                        onClick={onToggleCollapse}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Collapse sidebar"
                    >
                        <PanelLeftClose className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Expand button when collapsed */}
            {onToggleCollapse && collapsed && (
                <div className="px-4 py-2">
                    <button
                        onClick={onToggleCollapse}
                        className="w-full p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex justify-center"
                        title="Expand sidebar"
                    >
                        <PanelLeft className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = currentPage === item.id
                    const Icon = item.icon

                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-[#9b87f5]/20 text-white border border-[#9b87f5]/30"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent",
                                collapsed && "justify-center px-3"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={cn(
                                "w-5 h-5 transition-colors flex-shrink-0",
                                isActive ? "text-[#9b87f5]" : "text-slate-500"
                            )} />
                            {!collapsed && <span>{item.label}</span>}
                        </button>
                    )
                })}
            </nav>

            {/* Settings */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => onNavigate('settings')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                        currentPage === 'settings'
                            ? "bg-[#9b87f5]/20 text-white border border-[#9b87f5]/30"
                            : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent",
                        collapsed && "justify-center px-3"
                    )}
                    title={collapsed ? "Settings" : undefined}
                >
                    <Settings className={cn(
                        "w-5 h-5 transition-colors flex-shrink-0",
                        currentPage === 'settings' ? "text-[#9b87f5]" : "text-slate-500"
                    )} />
                    {!collapsed && <span>Settings</span>}
                </button>
            </div>
        </aside>
    )
}
