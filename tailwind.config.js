/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'mcd-color': '#da0006',
        'mcd-gray': '#D9D9D9'
      },
      width: {
        '53%': '53%',
        '38%': '38%'
      }
    },
  },
  plugins: [],
}