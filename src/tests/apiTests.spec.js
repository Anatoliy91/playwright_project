// src/tests/apiTests.spec.js
const { test, expect } = require('@playwright/test');
const API = require('../api');

let cookies;

test.beforeAll(async ({ page }) => {
  // Зайдите на страницу входа и выполните вход
  await page.goto('/login');
  
  await page.fill('input[name="username"]', 'test@gmail.com');
  await page.fill('input[name="password"]', '12345678');
  await page.click('button[type="submit"]');
  
  // Дождитесь, пока страница загрузится и проверьте успешность входа
  await page.waitForNavigation();
  
  // Получите куки
  cookies = await page.context().cookies();
});

test('should get a list of drivers', async () => {
  const api = new API('https://dev.omni-dispatch.com', cookies);
  await api.init();
  
  const response = await api.get('/drivers');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBeTruthy();
});

test('should get a list of trucks', async () => {
  const api = new API('https://dev.omni-dispatch.com', cookies);
  await api.init();
  
  const response = await api.get('/trucks');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(Array.isArray(responseBody)).toBeTruthy();
});

test('should get a specific driver by ID', async () => {
  const api = new API('https://dev.omni-dispatch.com', cookies);
  await api.init();
  
  const driverId = 1;
  const response = await api.get(`/drivers/${driverId}`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.id).toBe(driverId);
});
