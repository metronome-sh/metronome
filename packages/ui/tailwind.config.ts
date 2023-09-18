import type { Config } from 'tailwindcss';
import base from '../../tailwind.config';

export default {
  ...base,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
} satisfies Config;
