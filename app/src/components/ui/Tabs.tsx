import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
    activeTab: string
    setActiveTab: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
    const context = React.useContext(TabsContext)
    if (!context) {
        throw new Error("Tabs components must be used within a Tabs provider")
    }
    return context
}

interface TabsProps {
    defaultValue: string
    value?: string
    onValueChange?: (value: string) => void
    children: React.ReactNode
    className?: string
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, value, onValueChange, children, className }) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const activeTab = value ?? internalValue

    const setActiveTab = React.useCallback((newValue: string) => {
        if (value === undefined) {
            setInternalValue(newValue)
        }
        onValueChange?.(newValue)
    }, [value, onValueChange])

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn("w-full", className)}>{children}</div>
        </TabsContext.Provider>
    )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> { }

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center gap-1 p-1 rounded-lg bg-white/5 border border-white/10",
                className
            )}
            {...props}
        />
    )
)
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, value, ...props }, ref) => {
        const { activeTab, setActiveTab } = useTabsContext()
        const isActive = activeTab === value

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(value)}
                className={cn(
                    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                        ? "bg-[#9b87f5] text-white shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-white/5",
                    className
                )}
                {...props}
            />
        )
    }
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, value, ...props }, ref) => {
        const { activeTab } = useTabsContext()
        if (activeTab !== value) return null

        return (
            <div
                ref={ref}
                role="tabpanel"
                className={cn("mt-4 animate-in fade-in-50 duration-200", className)}
                {...props}
            />
        )
    }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
