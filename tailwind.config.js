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
      // Use more descriptive font name
      fontFamily: {
        nunito: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      // Simplified typography configuration
      typography: {
        DEFAULT: {
          css: {
            // Use currentColor for inheriting text color
            color: 'currentColor',
            a: {
              color: 'currentColor',
              '&:hover': {
                opacity: 0.8,
              },
            },
            // Inherit color for headings and paragraphs
            'h1, h2, h3, p': {
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
