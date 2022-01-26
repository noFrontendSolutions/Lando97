const colors = require('tailwindcss/colors')

module.exports = {
  //purge: [],
  content: ['./src/**/*.{html,js, ejs}', './views/**/*.{html,js, ejs}', './index.html'],
  darkMode: 'media', 
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blueGray: colors.blueGray,
        lightBlue: colors.lightBlue,
        amber: colors.amber,
        teal: colors.teal,
        violet: colors.violet,
        rose: colors.rose,
      },
      fontFamily: {
        playFair: ['Playfair'],
        roboto: ['Roboto'],
        raleway: ['Raleway'],
        pacifico: ['Pacifico'],
        quicksand: ['Quicksand'],
        oswald: ['Oswald'],
        lato: ['Lato'],
        dosis: ['Dosis'],
        modak: ['Modak'],
        openSans: ['Open Sans'],
        blackOpsOne: ['Black Ops One'],
        barrio: ['Barrio'],
        freckleFace: ['Freckle Face'],
        indieFlower: ['Indie Flower'],
        orbitron: ['Orbitron']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
