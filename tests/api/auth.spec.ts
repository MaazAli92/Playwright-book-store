import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../pages/api/auth.api';
import { invalidAuth, validAuth } from '../../pages/data/auth.data';

test.describe('Auth API', () => {
  test('should create auth token with valid credentials', async ({ request }) => {
    const authAPI = new AuthAPI(request);

    const response = await authAPI.createToken(validAuth);

    expect(response.token).toBeTruthy();
  });

  test('should fail auth token creation with invalid credentials', async ({ request }) => {
    const authAPI = new AuthAPI(request);

    const response = await authAPI.createTokenResponse(invalidAuth);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.reason).toBe('Bad credentials');
  });
});
