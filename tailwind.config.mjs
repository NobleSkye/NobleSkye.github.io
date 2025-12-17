/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#00ff00',
        secondary: '#00cc00',
        accent: '#66ff66',
        dark: '#000000',
        'dark-lighter': '#0a0a0a',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'sga': ['Sga Regular', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
