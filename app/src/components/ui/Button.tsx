import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0613] disabled:opacity-50 disabled:cursor-not-allowed"

        const variants = {
            primary: "bg-[#9b87f5] text-white hover:bg-[#8a76e4] focus:ring-[#9b87f5]",
            secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 focus:ring-white/20",
            destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
            outline: "border border-white/20 text-white hover:bg-white/5 focus:ring-white/20",
            ghost: "text-slate-400 hover:text-white hover:bg-white/5 focus:ring-white/10",
        }

        const sizes = {
            sm: "h-8 px-3 text-xs gap-1.5",
            md: "h-10 px-4 text-sm gap-2",
            lg: "h-12 px-6 text-base gap-2.5",
        }

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                )}
                {children}
            </button>
        )
    }
)

Button.displayName = "Button"

export { Button }
