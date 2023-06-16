/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white : '#FEFEFF',
      grey: '#7E8581',
      black : '#000000',
      green: '#4BAD70',
      green_light: '#E8F2E7', // All Reviews Button
      green_dark: '4B8D59',
      green_lightbg: '#EDFCF4', // Per Restaurant box in home/explore page and modals
      yellow: '#FFE500',
      red: '#FF3232',
    },
    fontFamily: {
      'sans': ['Wix Madefor Text', 'sans-serif'],
      'cursive': ['Comfortaa', 'cursive'],
    },
    extend: {
      spacing: {

      },
      borderRadius: {

      }
    },
  },
  plugins: [],
}
