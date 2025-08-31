/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        'sinhala': ['Noto Sans Sinhala', 'Iskoola Pota', 'sans-serif'],
        'tamil': ['Noto Sans Tamil', 'Latha', 'sans-serif'],
      },
      animation: {
        'tamil-cursor': 'blink 1s infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
