import type { Config } from 'tailwindcss';

const config: Config = {
  important: true,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
