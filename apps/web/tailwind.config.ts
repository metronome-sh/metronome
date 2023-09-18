import type { Config } from 'tailwindcss';
import base from '../../tailwind.config';

export default {
  ...base,
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../../packages/**/*.{js,jsx,ts,tsx}',
  ],
} satisfies Config;
