const { test, expect } = require('@playwright/test');
const API = require('../api.js');

const api = new API('https://dev.omni-dispatch.com');

test.beforeAll(async () => {
  await api.init();
  await api.login('test@gmail.com', '12345678'); // Введіть реальні дані
});

test.describe('API Tests', () => {
  test('should get a list of drivers', async () => {
    const response = await api.get('/drivers');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody); // Роздрукувати відповідь для дебагінгу
    expect(Array.isArray(responseBody)).toBeTruthy();
  });

  test('should get a list of trucks', async () => {
    const response = await api.get('/trucks');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody); // Роздрукувати відповідь для дебагінгу
    expect(Array.isArray(responseBody)).toBeTruthy();
  });

  test('should get a specific driver by ID', async () => {
    const driverId = 1; // Змініть на існуючий ID водія
    const response = await api.get(`/drivers/${driverId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody); // Роздрукувати відповідь для дебагінгу
    expect(responseBody.id).toBe(driverId);
  });
});
