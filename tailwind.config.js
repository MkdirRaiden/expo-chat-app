/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", // Enable dark mode with class strategy
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
