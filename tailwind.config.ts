import type { Config } from 'tailwindcss';

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
          'linear-gradient(125deg, #3a3a3a 0%, #3f3f3f 10%, #4a4a4a 20%, #3f3f3f 30%, #3a3a3a 50%, #3a3a3a 100%)',
      },
      backgroundSize: {
        shimmer: '800px 200px',
      },
      keyframes: {
        shimmer: {
          from: {
            'background-position': '-400px 0',
          },
          to: {
            'background-position': '400px 0',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 1s ease-in-out infinite forwards',
      },
    },
  },
  plugins: [],
};
export default config;
