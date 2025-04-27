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
    extend: {
      animation: {
        'gradient-move': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '4x': '400% 400%',
      },
      backgroundImage: {
        'primary-gradient':
          'linear-gradient(to bottom right, #D84B16, #C44614, #8A2F10)',
      },
    },
  },
  plugins: [],
} satisfies Config;
