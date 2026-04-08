import { APIRequestContext, expect } from '@playwright/test';

export class PingAPI {
  constructor(private readonly request: APIRequestContext) {}

  async healthCheck() {
    const response = await this.request.get('/ping');
    expect(response.status()).toBe(201);
    return response;
  }
}