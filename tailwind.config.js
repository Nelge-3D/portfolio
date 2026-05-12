/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 'media' si tu veux que ça suive les préférences système
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse-slow': 'spin 8s linear infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
