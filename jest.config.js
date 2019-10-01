process.env.VUE_CLI_BABEL_TARGET_NODE = true;
process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true;

module.exports = {
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   '**/*.{js, vue}',
  //   '!**/node_modules/**'
  // ],
  roots: [
    '<rootDir>/src'
  ],
  moduleFileExtensions: [
    'js', 'json', 'vue'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': "<rootDir>/src/$1"
  },
  testMatch: [
    '**/__tests__/*.test.js'
  ],
  transform: {
    '^.*\\.vue$': "<rootDir>/node_modules/vue-jest",
    '^.+\\.js$': "<rootDir>/node_modules/babel-jest"
  },
  transformIgnorePatterns: ['<rootDir>/node_modules']
}