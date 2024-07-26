// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests', // Указываем директорию с тестами
  use: {
    baseURL: 'https://dev.omni-dispatch.com',
    headless: true,
  },
});
