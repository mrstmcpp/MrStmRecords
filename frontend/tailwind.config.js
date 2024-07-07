module.exports = {
  content: ["./src/***/**/*.js"],
  darkMode: true,
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins", "sans-serif"],
      },
      colors: {
        "app-color": "#272936",
        "footer-color": "#151720",
        "rev-color": "rgba(255,255,255,.35)",
      },
      backgroundImage: {
        'box-pattern': "url('./assets/bg-box.png')",

      }
    },
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'], // if you need to apply filter effects on hover or focus
    },
  },
  plugins: [],
}
