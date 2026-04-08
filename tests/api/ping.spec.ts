import { test, expect } from '@playwright/test';
import { PingAPI } from '../../pages/api/ping.api.ts';

test.describe('Ping API', () => {
  test('should verify service health', async ({ request }) => {
    const pingAPI = new PingAPI(request);

    const response = await pingAPI.healthCheck();

    expect(response.status()).toBe(201);
  });
});
