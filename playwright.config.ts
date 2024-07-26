import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  use: {
    baseURL: 'https://dev.omni-dispatch.com',
    headless: true,
  },
});
