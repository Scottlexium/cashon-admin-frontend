/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CashOn Brand Colors
        primary: {
          DEFAULT: '#3AF4BD',
          50: '#F0FFFE',
          100: '#E0FFFD',
          200: '#C1FFFB',
          300: '#A2FFF9',
          400: '#83FFF7',
          500: '#3AF4BD',
          600: '#00E09B',
          700: '#00B87A',
          800: '#008F5A',
          900: '#00663A',
        },
        // Background Colors
        background: {
          DEFAULT: '#151517',
          secondary: '#171718',
        },
        surface: {
          DEFAULT: '#212123',
          secondary: '#303033',
          tertiary: '#2B2B2E',
        },
        // Text Colors
        text: {
          primary: '#DEDEE3',
          secondary: '#A2A2A7',
          muted: '#8C8C93',
          disabled: 'rgba(162, 162, 167, 0.5)',
        },
        // Accent Colors
        blue: {
          DEFAULT: '#65A3FF',
          light: '#A5E2FF',
        },
        orange: {
          DEFAULT: '#ECA450',
          light: '#FFB45E',
        },
        red: {
          DEFAULT: '#EE6868',
          dark: '#FF5462',
        },
        purple: '#E697FF',
        indigo: '#7987FF',
        // Status Colors
        success: {
          DEFAULT: '#05B480',
          light: '#01AB79',
          bg: '#ECFDF3',
        },
        warning: {
          DEFAULT: '#FFB45E',
          bg: '#FFF8E1',
        },
        error: {
          DEFAULT: '#EE6868',
          bg: '#FEF2F2',
        },
        info: {
          DEFAULT: '#7987FF',
          bg: '#EEF2FF',
        },
        // Border Colors
        border: {
          DEFAULT: '#2B2B2E',
          light: '#363639',
          lighter: '#40404B',
          accent: '#3AF4BD',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['56px', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        'h1': ['30px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'h2': ['28px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'h3': ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h4': ['21px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h5': ['20px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body': ['16px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-sm': ['14px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'caption': ['12px', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'tiny': ['10px', { lineHeight: '1.3', letterSpacing: '0.1em' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '56px',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '14px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '30px',
      },
      boxShadow: {
        'cashon-sm': '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        'cashon-md': '0px 1.19px 2.39px 0px rgba(16, 24, 40, 0.05)',
        'cashon-lg': '0px 4px 6px -1px rgba(16, 24, 40, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
