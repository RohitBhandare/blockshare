/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {
    extend: {
      // Enable the hover variant
      scale: ['responsive', 'hover', 'focus'],
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}