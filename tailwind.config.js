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
                    DEFAULT: '#FF4500', // Strong accent
                    hover: '#CC3700',
                },
                creator: {
                    DEFAULT: '#FF4500',
                    hover: '#CC3700',
                },
                neutral: {
                    white: '#FFFFFF',
                    lightest: '#FDFBF7', // Cream
                    lighter: '#E8E4DB', // Cream border
                    light: '#A39E93',
                    DEFAULT: '#7A756C',
                    dark: '#3A3A3A',
                    darker: '#222222',
                    darkest: '#111111', // Black
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
                'slideUpFade': 'slideUpFade 0.5s ease-out forwards',
                'slide-vertical': 'slideVertical 12s cubic-bezier(0.4, 0, 0.2, 1) infinite',
                'float-1': 'float 6s ease-in-out infinite',
                'float-2': 'float 8s ease-in-out infinite',
                'float-3': 'float 7s ease-in-out infinite',
                'float-4': 'float 9s ease-in-out infinite',
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
                },
                slideVertical: {
                    '0%, 21.66%': { transform: 'translateY(0)' },
                    '25%, 46.66%': { transform: 'translateY(-20%)' },
                    '50%, 71.66%': { transform: 'translateY(-40%)' },
                    '75%, 96.66%': { transform: 'translateY(-60%)' },
                    '100%': { transform: 'translateY(-80%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
        }
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
}
