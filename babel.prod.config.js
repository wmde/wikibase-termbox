module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
	  ["conditional-compilation", { "DEV": false } ]
  ]
}
