import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    description?: string
    error?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, description, error, leftIcon, rightIcon, id, ...props }, ref) => {
        const inputId = id || React.useId()

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-white">
                        {label}
                    </label>
                )}
                {description && (
                    <p className="text-xs text-slate-400">{description}</p>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        id={inputId}
                        ref={ref}
                        className={cn(
                            "w-full h-10 rounded-lg bg-white/5 border text-white placeholder:text-slate-500",
                            "focus:outline-none focus:ring-2 focus:ring-[#9b87f5] focus:border-transparent",
                            "transition-all duration-200",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            error ? "border-red-500" : "border-white/10 hover:border-white/20",
                            leftIcon ? "pl-10" : "pl-4",
                            rightIcon ? "pr-10" : "pr-4",
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

Input.displayName = "Input"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    description?: string
    error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, description, error, id, ...props }, ref) => {
        const inputId = id || React.useId()

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-white">
                        {label}
                    </label>
                )}
                {description && (
                    <p className="text-xs text-slate-400">{description}</p>
                )}
                <textarea
                    id={inputId}
                    ref={ref}
                    className={cn(
                        "w-full min-h-[100px] rounded-lg bg-white/5 border px-4 py-3 text-white placeholder:text-slate-500",
                        "focus:outline-none focus:ring-2 focus:ring-[#9b87f5] focus:border-transparent",
                        "transition-all duration-200 resize-y",
                        error ? "border-red-500" : "border-white/10 hover:border-white/20",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-400">{error}</p>
                )}
            </div>
        )
    }
)

Textarea.displayName = "Textarea"

export { Input, Textarea }
