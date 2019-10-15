process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   '**/*.{js, vue}',
  //   '!**/node_modules/**'
  // ],
  roots: [
    '<rootDir>/src',
    '<rootDir>/',
  ],
  moduleFileExtensions: [
    'js', 'vue', 'json'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': "<rootDir>/src/$1"
  },
  setupFiles: [
    '<rootDir>/src/tests/setup.js'
  ],
  testMatch: [
    '**/__tests__/*.test.js',
    '**/vueshots.test.js'
  ],
  transform: {
    '^.*\\.vue$': "vue-jest",
    '^.+\\.stories\\.jsx?$': '<rootDir>/.storybook/injectFileName.js',
    '^.+\\.js$': "<rootDir>/node_modules/babel-jest",
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  snapshotSerializers: ["jest-serializer-html"]
}
