module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,svg}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      display: ['hover', 'group-hover'],
      left:['hover', 'group-hover'],
      animation: ['responsive', 'motion-safe', 'motion-reduce', 'spin', 'pulse']
    },
    
  },
  plugins: [],
  mode: 'jit',
}
