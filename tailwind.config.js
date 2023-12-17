/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './pages/**/*.{html,js}', './components/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Montserrat',
          'system-ui',
          '-apple-system',
          'Arial',
          'Helvetica',
          'sans-serif',
        ],
      },
    },
  },
};
