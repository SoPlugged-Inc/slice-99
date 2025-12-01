/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'sans-serif'],
                serif: ['"Libre Baskerville"', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                zinc: {
                    50: '#fafafa',
                    900: '#18181b',
                },
                orange: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                },
                primary: {
                    DEFAULT: '#0055FF',
                    hover: '#0044CC',
                },
                creator: {
                    DEFAULT: '#FF3879',
                    hover: '#E01E5A',
                },
                neutral: {
                    white: '#FFFFFF',
                    lightest: '#F5F7FA',
                    lighter: '#E2E8F0',
                    light: '#94A3B8',
                    DEFAULT: '#64748B',
                    dark: '#334155',
                    darker: '#1E293B',
                    darkest: '#0F172A',
                },
                brand: {
                    green: '#10b981',
                    'green-dark': '#047857',
                }
            },
            borderRadius: {
                'sm': '0.125rem',
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'glow': '0 0 20px rgba(0, 85, 255, 0.15)',
            },
            animation: {
                'marquee': 'marquee 40s linear infinite',
                'clip-down': 'clipDown 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
                'notification-slide': 'notificationSlide 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)",
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                clipDown: {
                    '0%': { 'clip-path': 'inset(0 0 100% 0)' },
                    '100%': { 'clip-path': 'inset(0 0 0 0)' },
                },
                'border-beam': {
                    '100%': { 'offset-distance': '100%' },
                },
                notificationSlide: {
                    '0%': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                }
            },
        }
    },
    plugins: [],
}
