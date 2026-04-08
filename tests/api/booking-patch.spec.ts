import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../pages/api/auth.api';
import { BookingAPI } from '../../pages/api/booking.api';
import { validAuth } from '../../pages/data/auth.data';
import { BookingData } from '../../pages/data/booking.data';

test.describe('Booking PATCH API', () => {
  test('should partially update an existing booking', async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const bookingAPI = new BookingAPI(request);

    const tokenResponse = await authAPI.createToken(validAuth);
    const token = tokenResponse.token;

    const createPayload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(createPayload);

    const patchedBooking = await bookingAPI.partialUpdateBooking(
      createdBooking.bookingid,
      {
        firstname: 'Patched',
        additionalneeds: 'Late Checkout'
      },
      token
    );

    expect(patchedBooking.firstname).toBe('Patched');
    expect(patchedBooking.additionalneeds).toBe('Late Checkout');
    expect(patchedBooking.lastname).toBe(createPayload.lastname);
  });

  test('should fail partial update without token', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const createPayload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(createPayload);

    const response = await bookingAPI.partialUpdateBookingResponse(createdBooking.bookingid, {
      firstname: 'Unauthorized'
    });

    expect(response.status()).toBe(403);
  });
});
