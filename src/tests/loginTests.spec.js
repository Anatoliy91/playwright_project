require('dotenv').config();
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('https://dev.omni-dispatch.com/');
    try {
      await page.waitForSelector('input#input-0', { timeout: 60000 });
    } catch (error) {
      await page.screenshot({ path: 'error_screenshot.png' });
      throw error;
    }
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    await loginPage.login(username, password);
  });

  test('should fail to login with invalid credentials', async ({ page }) => {
    const username = process.env.USERNAME;
    const password = 'invalid-password';
    await loginPage.login(username, password);
  });
});