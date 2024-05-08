import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/subdomains/**/*.tsx',
    './src/shared/**/*.tsx',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        gallery: 'repeat(auto-fit, minmax(min(20rem, 100%),1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        shimmer:
          'linear-gradient(-45deg, #3f3f46 40%, #71717a 50%, #3f3f46 60%)',
      },
      backgroundSize: {
        shimmer: '400%',
      },
      keyframes: {
        shimmer: {
          from: {
            'background-position-x': '100%',
          },
          to: {
            'background-position-x': '0%',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default withUt(config);
