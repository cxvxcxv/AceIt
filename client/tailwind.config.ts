import type { Config } from 'tailwindcss';

import { COLORS } from './src/constants/color.constants';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: COLORS,
  },
  plugins: [],
} satisfies Config;
