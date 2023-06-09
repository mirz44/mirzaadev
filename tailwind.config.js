/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      display: ['Raleway'],
      body: ['Raleway'],
    },
    extend: {
      colors: {
        'yellow': '#fddb07',
        'red': '#e44e26'
      }
    }
  },
  plugins: [],
}
