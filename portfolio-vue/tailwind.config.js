/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          950: '#001D39',
          900: '#0A4174',
          800: '#49769F',
          700: '#4E8EA2',
          600: '#6EA2B3',
          500: '#7BBDE8',
          300: '#BDD8E9',
        },
        accent: {
          300: '#FFD1D9',
          500: '#FFB6C1',
          700: '#E89AA6',
        }
      },
    },
  },
  plugins: [],
}
