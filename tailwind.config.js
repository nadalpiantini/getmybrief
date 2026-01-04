/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sistema Nadal dark theme
        background: '#0f0f0f',
        surface: '#1a1a1a',
        'surface-hover': '#252525',
        border: '#333333',
        primary: '#3b82f6',
        'primary-hover': '#2563eb',
        accent: '#f59e0b',
        success: '#22c55e',
        error: '#ef4444',
        warning: '#eab308',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1.5s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
