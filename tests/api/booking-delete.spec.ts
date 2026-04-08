import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../pages/api/auth.api';
import { BookingAPI } from '../../pages/api/booking.api';
import { validAuth } from '../../pages/data/auth.data';
import { BookingData } from '../../pages/data/booking.data';

test.describe('Booking DELETE API', () => {
  test('should delete an existing booking', async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const bookingAPI = new BookingAPI(request);

    const tokenResponse = await authAPI.createToken(validAuth);
    const token = tokenResponse.token;

    const createPayload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(createPayload);

    const deleteResponse = await bookingAPI.deleteBooking(createdBooking.bookingid, token);

    expect([201, 204]).toContain(deleteResponse.status());

    const getDeletedResponse = await bookingAPI.getBookingByIdResponse(createdBooking.bookingid);
    expect(getDeletedResponse.status()).toBe(404);
  });

  test('should fail delete without token', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const createPayload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(createPayload);

    const response = await bookingAPI.deleteBookingResponse(createdBooking.bookingid);

    expect(response.status()).toBe(403);
  });
});
