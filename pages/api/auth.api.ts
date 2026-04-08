import { APIRequestContext, expect } from '@playwright/test';
import { AuthRequest, AuthResponse } from '../../utils/bookInterface';

export class AuthAPI {
  constructor(private readonly request: APIRequestContext) {}

  async createToken(payload: AuthRequest): Promise<AuthResponse> {
    const response = await this.request.post('/auth', {
      data: payload
    });

    expect(response.status()).toBe(200);

    return (await response.json()) as AuthResponse;
  }

  async createTokenResponse(payload: AuthRequest) {
    return await this.request.post('/auth', {
      data: payload
    });
  }
}
