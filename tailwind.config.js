/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
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
  plugins: [
    typography,
  ],
}

