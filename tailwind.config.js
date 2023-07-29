/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white : '#FEFEFF',
      grey: '#7E8581',
      black : '#000000',
      green: '#4BAD70',
      green_light: '#E8F2E7', // All Reviews Button
      green_dark: '#4B8D59',
      green_lightbg: '#EDFCF4', // Per Restaurant box in home/explore page and modals
      yellow: '#FFE500',
      red: '#FF3232',
    },
    fontFamily: {
      'sans': ['Wix Madefor Text', 'sans-serif'],
      'cursive': ['Comfortaa', 'cursive'],
      'monospace': ['JetBrains Mono', 'monospace']
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

