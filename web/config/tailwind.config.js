module.exports = {
  presets: [
    require("shared/styles.preset.cjs")
  ],
  content: ['src/**/*.{js,jsx,ts,tsx}', '../shared/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
