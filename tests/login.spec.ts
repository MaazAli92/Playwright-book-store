import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login UI validation', () => {
  test('Login with correct password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
    await expect(page).toHaveURL(/.*profile/);
  });

  test('Login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.USERNAME!, 'wrongPass');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid');
  });
});
