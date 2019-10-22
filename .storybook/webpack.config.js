const path = require('path');
const prism = require('markdown-it-prism');
const highlightLines = require('markdown-it-highlight-lines');
const linkAttributes = require('markdown-it-link-attributes');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.module.rules.push({
    test: /\.stories\.js?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });

  // remove svg from existing rule
  /*config.module.rules = config.module.rules.map(rule => {
    if (
      String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/)
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
      }
    }

    return rule
  })

// use svgr for svg files
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
    include: path.resolve(__dirname, '../'),
  })*/

  config.module.rules.push({
    test: /\.md$/,
    use: [
      {
        loader: require.resolve('markdown-it-loader'),
        options: {
          use: [
            prism,
            highlightLines,
            [
              linkAttributes,
              {
                pattern: /^https?:/,
                attrs: {
                  class: 'external-link',
                  target: '_blank',
                },
              },
            ],
          ],
        },
      },
    ],
  });

  // Return the altered config
  return config;
};
