/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./_includes/**/*.{njk,css,js}",
    "./_layouts/**/*.{njk,css,js}",
    "./content/**/*.{html,js,md,njk}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
