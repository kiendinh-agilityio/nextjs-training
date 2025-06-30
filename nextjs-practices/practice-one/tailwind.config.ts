import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-card': 'var(--background-card)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        neutral: 'var(--neutral)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        error: 'var(--error)',
      },
      borderColor: {
        base: 'var(--border-base)',
      },
      boxShadow: {
        base: 'var(--shadow-base)',
      },
      fontFamily: {
        base: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        base: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '6.25rem',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
