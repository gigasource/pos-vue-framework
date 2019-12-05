module.exports = {
  presets: [
    'vca-jsx',
    '@vue/app',
  ],
  env: {
    test: {
      plugins: ["require-context-hook"]
    }
  }
}
