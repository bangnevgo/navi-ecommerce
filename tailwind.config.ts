import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Variable', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Geist Mono', 'monospace'],
      },
      colors: {
        // NAVI Pro design tokens
        canvas:  '#0d1117',
        surface: '#161b22',
        overlay: '#1c2128',
        border:  '#21262d',
        // Brand
        brand: {
          DEFAULT: '#818cf8',
          muted:   'rgba(99,102,241,0.12)',
          border:  'rgba(99,102,241,0.25)',
        },
        // Tremor overrides for dark theme
        tremor: {
          brand: {
            faint:    '#0d1117',
            muted:    '#161b22',
            subtle:   '#484f58',
            DEFAULT:  '#818cf8',
            emphasis: '#a5b4fc',
            inverted: '#0d1117',
          },
          background: {
            muted:    '#0d1117',
            subtle:   '#161b22',
            DEFAULT:  '#0d1117',
            emphasis: '#21262d',
          },
          border: {
            DEFAULT: 'rgba(255,255,255,0.07)',
          },
          ring: {
            DEFAULT: 'rgba(99,102,241,0.4)',
          },
          content: {
            subtle:   '#484f58',
            DEFAULT:  '#7d8590',
            emphasis: '#c9d1d9',
            strong:   '#e6edf3',
            inverted: '#0d1117',
          },
        },
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        fadeIn:   { from: { opacity: '0' },                                to: { opacity: '1' } },
        cmdIn:    { from: { opacity: '0', transform: 'translateY(-12px) scale(.97)' }, to: { opacity: '1', transform: 'none' } },
        livePulse:{ '0%, 100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '.4', transform: 'scale(.75)' } },
      },
      animation: {
        fadeUp:    'fadeUp .35s ease both',
        fadeIn:    'fadeIn .2s ease both',
        cmdIn:     'cmdIn .18s cubic-bezier(.4,0,.2,1) both',
        livePulse: 'livePulse 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    { pattern: /^(bg|text|border|ring)-(tremor)/ },
  ],
};

export default config;
