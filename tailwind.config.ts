import type { Config } from 'tailwindcss';

const REM_FACTOR = 0.25;

const spacing = Array.from(Array(1001).keys()).reduce(
  (acc, n) => ({ ...acc, [n]: `${n * REM_FACTOR}rem` }),
  {},
);

export default {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      spacing,
      maxWidth: ({ theme }) => ({ ...theme('spacing'), '8xl': '90rem' }),
    },
  },
  plugins: [],
} satisfies Config;
