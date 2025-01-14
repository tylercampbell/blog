/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./content/**/*.{html,js,md,njk}",
    "./_includes/**/*.{njk,css,js}",
    "./eleventy.config.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
