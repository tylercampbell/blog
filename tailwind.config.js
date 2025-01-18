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
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'currentColor',
            a: {
              color: 'currentColor',
              '&:hover': {
                // opacity: 0.8,
              },
            },
            // Inherit color for headings and paragraphs
            'h1, h2, h3, h4': {
              color: 'currentColor',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
