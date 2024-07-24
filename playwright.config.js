// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests', // Вказуємо директорію з тестами
  // інші параметри конфігурації
});
