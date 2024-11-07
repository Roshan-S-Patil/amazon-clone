/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [   './pages/**/*.{html,js}',
    './components/**/*.{html,js}',"./src/**/*.{html,js}"],
  theme: {
    extend: {
      translate:{

      },
      aspectRatio: {
        '9/16': '9 / 16',
        'banner':'4/1'
      },
    },
  },
  plugins: [],
}

