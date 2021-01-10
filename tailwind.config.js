const defaultColor = require('./color')
const customColor = {
  white: {
    default: '#fff',
    primary: '#f0f3f6'
  },
  black: '#000',
  transparent: 'transparent',
  current: 'currentColor',
  theme: {
    text: '#2c3f51',
    primary: '#30849a',
    menu: '#082634'
  }
}
const colors = Object.assign(defaultColor, customColor)

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }
      md: { max: '768px' },
      // => @media (max-width: 767px) { ... }
      sm: { max: '639px' }
      // => @media (max-width: 639px) { ... }
    },
    colors,
    extend: {
      transitionDuration: {
        primary: '300ms'
      },
      transitionTimingFunction: {
        primary: 'ease'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
