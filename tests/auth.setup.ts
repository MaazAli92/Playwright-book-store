import { test as setup, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

setup('authenticate bookstore user', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await page.goto('/login');
  await page.locator('#userName').fill(process.env.USERNAME!);
  await page.locator('#password').fill(process.env.PASSWORD!);
  await page.locator('#login').click();

  await page.waitForURL('**/profile');
  await expect(page.locator('#userName-value')).toHaveText(process.env.USERNAME!);

  await page.context().storageState({ path: authFile });
});
