/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'sans': [
        '"Quicksand"',
        'Roboto',
      ],
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
