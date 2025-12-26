import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                protocol: {
                    navy: '#020617',    // Slate 950 - Deep background
                    charcoal: '#0f172a', // Slate 900 - Card background
                    blue: '#3b82f6',     // Blue 500 - Primary Action (Electric Blue-ish)
                    teal: '#14b8a6',     // Teal 500 - Success
                    amber: '#f59e0b',    // Amber 500 - Warning
                    red: '#ef4444',      // Red 500 - Error
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
} satisfies Config
