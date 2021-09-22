module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['hover', 'group-hover'],
      left:['hover', 'group-hover']
    },
  },
  plugins: [],
  mode: 'jit',
}
