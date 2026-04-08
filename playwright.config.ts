import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/
    },
    {
      name: 'Book Store',
      dependencies: ['setup'],
      testIgnore: ['**/login.spec.ts', '**/auth.setup.ts'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: path.resolve(__dirname, 'playwright/.auth/user.json')
      }
    },
    {
      name: 'login',
      testMatch: ['**/login.spec.ts'],
      testIgnore: ['**/auth.setup.ts'],
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
