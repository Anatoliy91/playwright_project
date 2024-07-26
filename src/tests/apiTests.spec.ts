import { test, expect } from '@playwright/test';
import { API } from '../api';

const api = new API('https://dev.omni-dispatch.com');

test.beforeAll(async () => {
  await api.init();
  await api.login('test@gmail.com', '12345678'); 
});

test('should get a list of drivers', async () => {
  const response = await api.get('/drivers');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody).toBeDefined();
});

test('should get a list of trucks', async () => {
  const response = await api.get('/trucks');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody).toBeDefined();
});

test('should get a specific driver by ID', async () => {
  const driverId = 1;
  const response = await api.get(`/drivers/${driverId}`);
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody).toBeDefined();
});
