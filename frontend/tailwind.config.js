/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'brutal-black': '#000000',
        'brutal-white': '#FFFFFF',
        'brutal-yellow': '#FFFF00',
        'brutal-blue': '#0055FF',
        'brutal-pink': '#FF2D6A',
        'brutal-green': '#00F5A0',
        'brutal-purple': '#8B5CF6',
        'brutal-orange': '#FF6B00',
        'brutal-cyan': '#00D4FF',
        'brutal-lime': '#BFFF00',
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-md': '6px 6px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-xl': '12px 12px 0px 0px #000000',
        'brutal-hover': '2px 2px 0px 0px #000000',
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 4s ease-in-out infinite 0.5s',
        'spin-slow': 'spin 20s linear infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
