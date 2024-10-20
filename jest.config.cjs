module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: [
    '**/tests/**/*.spec.(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
 },
 reporters: [
  "default", 
  ["jest-html-reporter", {
    pageTitle: "Test Report",
    outputPath: "test-report.html",
    includeFailureMsg: true,
    }]
  ]
};
