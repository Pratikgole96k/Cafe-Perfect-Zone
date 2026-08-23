/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cafe: {
          black: '#0a0a0c',
          dark: '#121216',
          card: '#18181f',
          surface: '#22222b',
          border: '#2e2e3a',
          gold: '#eab308',
          'gold-light': '#facc15',
          'gold-dark': '#ca8a04',
          'gold-muted': 'rgba(234, 179, 8, 0.15)',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Poppins"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['"Poppins"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(234, 179, 8, 0.3)',
        'gold-glow-lg': '0 0 40px -5px rgba(234, 179, 8, 0.45)',
        'gold-sm': '0 0 10px rgba(234, 179, 8, 0.2)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(10, 10, 12, 0.8), #0a0a0c)',
      }
    },
  },
  plugins: [],
}
