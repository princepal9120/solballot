import type { Config } from 'tailwindcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                solana: {
                    base: '#0a0a0f',     // Deepest background
                    surface: '#111827',  // Card background
                    purple: '#9945FF',   // Primary Action
                    cyan: '#14F195',     // Success
                    green: '#14F195',    // Alias for cyan/green
                    amber: '#FFA500',    // Warning
                    red: '#EF4444',      // Error
                    gray: '#6b7280',     // Secondary text
                    dark: '#0a0a0f',     // Alias for base
                },
                protocol: { // keeping existing mapped to new for backward compat if needed, or just replace usage later
                    navy: '#0a0a0f',
                    charcoal: '#111827',
                    blue: '#9945FF',     // Mapping old blue to new purple for primary actions
                    teal: '#14F195',
                    amber: '#FFA500',
                    red: '#EF4444',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [],
} satisfies Config
