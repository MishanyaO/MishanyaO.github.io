import { defineConfig } from '@playwright/test';

const executablePath = process.env.CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list']],
  use: { launchOptions: { executablePath } },
  webServer: [
    { command: 'npm run preview -- --port 4321', url: 'http://localhost:4321', reuseExistingServer: !process.env.CI, timeout: 60_000 },
    { command: 'npm run dev -- --port 4322', url: 'http://localhost:4322', reuseExistingServer: !process.env.CI, timeout: 60_000 },
  ],
  projects: [
    { name: 'prod', testMatch: /prod\.spec\.ts/, use: { baseURL: 'http://localhost:4321', colorScheme: 'dark' } },
    { name: 'dev', testMatch: /dev\.spec\.ts/, use: { baseURL: 'http://localhost:4322' } },
  ],
});
