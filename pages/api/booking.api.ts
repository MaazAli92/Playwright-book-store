import { APIRequestContext, expect } from '@playwright/test';
import { BookingIdItem, BookingPayload, BookingSearchParams, CreateBookingResponse } from '../../utils/bookInterface';

export class BookingAPI {
  constructor(private readonly request: APIRequestContext) {}

  private getTokenHeader(token: string) {
    return {
      Cookie: `token=${token}`
    };
  }

  async getBookingIds(params?: BookingSearchParams): Promise<BookingIdItem[]> {
    const response = await this.request.get('/booking', { params });
    expect(response.status()).toBe(200);

    return (await response.json()) as BookingIdItem[];
  }

  async getBookingById(id: number): Promise<BookingPayload> {
    const response = await this.request.get(`/booking/${id}`);
    expect(response.status()).toBe(200);

    return (await response.json()) as BookingPayload;
  }

  async getBookingByIdResponse(id: number) {
    return await this.request.get(`/booking/${id}`);
  }

  async createBooking(payload: BookingPayload): Promise<CreateBookingResponse> {
    const response = await this.request.post('/booking', {
      data: payload
    });

    expect(response.status()).toBe(200);

    return (await response.json()) as CreateBookingResponse;
  }

  async updateBooking(id: number, payload: BookingPayload, token: string): Promise<BookingPayload> {
    const response = await this.request.put(`/booking/${id}`, {
      headers: this.getTokenHeader(token),
      data: payload
    });

    expect(response.status()).toBe(200);

    return (await response.json()) as BookingPayload;
  }

  async updateBookingResponse(id: number, payload: BookingPayload, token?: string) {
    return await this.request.put(`/booking/${id}`, {
      headers: token ? this.getTokenHeader(token) : {},
      data: payload
    });
  }

  async partialUpdateBooking(id: number, payload: Partial<BookingPayload>, token: string): Promise<BookingPayload> {
    const response = await this.request.patch(`/booking/${id}`, {
      headers: this.getTokenHeader(token),
      data: payload
    });

    expect(response.status()).toBe(200);

    return (await response.json()) as BookingPayload;
  }

  async partialUpdateBookingResponse(id: number, payload: Partial<BookingPayload>, token?: string) {
    return await this.request.patch(`/booking/${id}`, {
      headers: token ? this.getTokenHeader(token) : {},
      data: payload
    });
  }

  async deleteBooking(id: number, token: string) {
    return await this.request.delete(`/booking/${id}`, {
      headers: this.getTokenHeader(token)
    });
  }

  async deleteBookingResponse(id: number, token?: string) {
    return await this.request.delete(`/booking/${id}`, {
      headers: token ? this.getTokenHeader(token) : {}
    });
  }
}
