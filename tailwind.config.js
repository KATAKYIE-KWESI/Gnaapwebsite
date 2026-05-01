/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0f7f3',
          100: '#d9ede2',
          200: '#b3dbc5',
          300: '#7ec0a0',
          400: '#4da07a',
          500: '#2d845f',
          600: '#1B3A2D', // primary dark forest green
          700: '#163024',
          800: '#12261c',
          900: '#0d1c14',
        },
        gold: {
          50:  '#fdf8ed',
          100: '#faefd2',
          200: '#f5dda0',
          300: '#efc86a',
          400: '#e8b23c',
          500: '#C9983B', // primary gold
          600: '#b07d2a',
          700: '#8f621e',
          800: '#714d18',
          900: '#5a3c14',
        },
        cream: {
          50:  '#FDFAF5',
          100: '#FAF7F0',
          200: '#F5F0E4',
          300: '#EDE5D4',
          400: '#DCCFB8',
        },
        ink: {
          DEFAULT: '#111111',
          soft: '#333333',
          muted: '#666666',
          light: '#999999',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
