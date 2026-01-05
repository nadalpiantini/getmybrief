/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // GetMyBrief Design System v1.0 - Synced with Extension

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
        secondary: '#8b5cf6',

        // Accent Gold Scale
        'accent-400': '#facc15',
        'accent-500': '#eab308',
        'accent-600': '#ca8a04',
        accent: '#eab308',

        // Surfaces - Dark Theme
        dark: '#0a0a0a',
        background: '#0a0a0a',
        'surface-0': '#0f0f0f',
        'surface-1': '#141414',
        'surface-2': '#1a1a1a',
        'surface-3': '#1f1f1f',
        surface: '#1a1a1a',

        // Borders
        'border-subtle': '#1f1f1f',
        'border-default': '#2a2a2a',
        'border-strong': '#3a3a3a',

        // Semantic Colors
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',

        // Text Colors
        'text-primary': '#ffffff',
        'text-secondary': '#a1a1aa',
        'text-tertiary': '#71717a',
        'text-muted': '#52525b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'count-up': 'count-up 2s ease-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        'count-up': {
          from: { opacity: 0 },
          to: { opacity: 1 },
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
      },
    },
  },
  plugins: [],
};
