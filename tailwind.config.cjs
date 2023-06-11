/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accentColor: '#33CCCC',
        darkPrimary: '#0f0e07',
        lightPrimary: '#e7dfe4',
        success: '#0fbb0f',
      },
      transitionProperty: {
        bg: 'background-color',
      },
      boxShadow: {
        primary: '0 0 4px 1px #33CCCC',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      transitionDuration: {
        DEFAULT: '400ms',
      },
      animation: {
        breath: 'breath 1s infinite linear',
      },
      keyframes: {
        breath: {
          '0%': {
            'animation-timing-function': 'cubic-bezier(0.9647,0.2413,-0.0705,0.7911)',
            transform: 'scale(0.9)',
          },
          '50%': {
            'animation-timing-function': 'cubic-bezier(0.9226,0.2631,-0.0308,0.7628)',
            transform: 'scale(1)',
          },
          '100%': {
            transform: 'scale(0.9)',
          },
        },
      },
    },
  },
  plugins: [],
};
