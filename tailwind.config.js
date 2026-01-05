/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GetMyBrief Design System v1.0 - Purple/Violet Theme

        // Primary Purple Scale
        'primary-50': '#faf5ff',
        'primary-100': '#f3e8ff',
        'primary-200': '#e9d5ff',
        'primary-300': '#d8b4fe',
        'primary-400': '#c084fc',
        'primary-500': '#a855f7',
        'primary-600': '#9333ea',
        'primary-700': '#7e22ce',
        'primary-800': '#6b21a8',
        'primary-900': '#581c87',

        // Legacy aliases
        primary: '#a855f7',
        'primary-hover': '#9333ea',

        // Accent Gold Scale
        'accent-400': '#facc15',
        'accent-500': '#eab308',
        'accent-600': '#ca8a04',
        accent: '#eab308',

        // Surfaces - Dark Theme
        background: '#0a0a0a',
        'surface-0': '#0f0f0f',
        'surface-1': '#141414',
        'surface-2': '#1a1a1a',
        'surface-3': '#1f1f1f',
        'surface-4': '#262626',
        surface: '#1a1a1a',
        'surface-hover': '#1f1f1f',

        // Borders
        'border-subtle': '#1f1f1f',
        'border-default': '#2a2a2a',
        'border-strong': '#3a3a3a',
        border: '#2a2a2a',

        // Semantic Colors
        'success-400': '#4ade80',
        'success-500': '#22c55e',
        'success-600': '#16a34a',
        success: '#22c55e',

        'error-400': '#f87171',
        'error-500': '#ef4444',
        'error-600': '#dc2626',
        error: '#ef4444',

        'warning-400': '#fbbf24',
        'warning-500': '#f59e0b',
        'warning-600': '#d97706',
        warning: '#f59e0b',

        'info-400': '#60a5fa',
        'info-500': '#3b82f6',
        'info-600': '#2563eb',

        // Text Colors
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1aa',
        'text-tertiary': '#71717a',
        'text-muted': '#52525b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1.5s ease-in-out infinite',
        'bounce-dot': 'bounce-dot 0.6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.3s cubic-bezier(0.2, 0, 0, 1)',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.2, 0, 0, 1)',
        'spin-fast': 'spin 0.5s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
        'bounce-dot': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'fade-in-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(168, 85, 247, 0.2)',
        'glow': '0 0 40px rgba(168, 85, 247, 0.3)',
        'glow-lg': '0 0 60px rgba(168, 85, 247, 0.4)',
        'glow-accent': '0 0 30px rgba(234, 179, 8, 0.3)',
      },
    },
  },
  plugins: [],
};
