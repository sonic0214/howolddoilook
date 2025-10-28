/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terracotta': '#D97706',
        'brand-dark': '#1F2937',
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        'serif-display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
