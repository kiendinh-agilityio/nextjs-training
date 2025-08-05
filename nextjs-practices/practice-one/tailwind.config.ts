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
        'neutral-950': 'var(--neutral-950)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        error: 'var(--error)',
        navy: 'var(--navy)',
        'navy-900': 'var(--navy-900)',
        'gray-450': 'var(--gray-450)',
        'gray-400': 'var(--gray-400)',
        'gray-350': 'var(--gray-350)',
        'gray-270': 'var(--gray-270)',
        'gray-250': 'var(--gray-250)',
        'gray-75': 'var(--gray-75)',
      },
      borderColor: {
        base: 'var(--border-base)',
        sm: 'var(--border-sm)',
      },
      borderRadius: {
        '4xl': '120px',
      },
      boxShadow: {
        base: 'var(--shadow-base)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        xl: 'var(--shadow-xl)',
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
          DEFAULT: '11px',
          sm: '2rem',
          lg: '6.25rem',
        },
      },
      backgroundImage: {
        'hero-restaurant': "url('/images/bg-hero-restaurant.webp')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
