const path = require('path');
module.exports = {
  runtimeCompiler: true,
  outputDir: './dist',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development'? 'source-map': false,
  },
  chainWebpack(config) {
    config.module.rule('scss')
    .oneOf('vue')
    .use('resolve-url-loader')
    .loader('resolve-url-loader')
    .before('sass-loader')
    .end()
    .use('sass-loader')
    .loader('sass-loader')
    .tap(options => ({
      ...options,
      sourceMap: true,
    }))
  },
};
