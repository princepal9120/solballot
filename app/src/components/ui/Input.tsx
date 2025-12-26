import React from 'react';
import { cn } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={cn(
                "flex h-10 w-full rounded-lg border border-slate-700 bg-solana-dark px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-solana-purple/50 focus:border-solana-purple disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner font-mono",
                className
            )}
            {...props}
        />
    );
};
