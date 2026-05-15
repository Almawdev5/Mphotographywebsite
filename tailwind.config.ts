import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        black: '#111111',
        white: '#F5F5F5',
        gray: '#2B2B2B',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config