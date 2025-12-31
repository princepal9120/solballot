import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variants = {
            default: "bg-[#9b87f5]/20 text-[#9b87f5] border-[#9b87f5]/30",
            success: "bg-green-500/20 text-green-400 border-green-500/30",
            warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            destructive: "bg-red-500/20 text-red-400 border-red-500/30",
            outline: "bg-transparent text-slate-400 border-white/20",
        }

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    variants[variant],
                    className
                )}
                {...props}
            />
        )
    }
)

Badge.displayName = "Badge"

export { Badge }
