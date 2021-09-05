module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    test: {
      plugins: ["@vue/babel-plugin-jsx"]
    }
  }
}
