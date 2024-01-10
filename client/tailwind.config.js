/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'myShadow': '0px 2px 1.5px rgb(36, 36, 36)',
      }
    },
  },
  plugins: [],
}