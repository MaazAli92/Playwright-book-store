import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../pages/api/auth.api';
import { BookingAPI } from '../../pages/api/booking.api';
import { validAuth } from '../../pages/data/auth.data';
import { BookingData } from '../../pages/data/booking.data';

test.describe('Booking PUT API', () => {
  test('should fully update an existing booking', async ({ request }) => {
    const authAPI = new AuthAPI(request);
    const bookingAPI = new BookingAPI(request);

    const tokenResponse = await authAPI.createToken(validAuth);
    const token = tokenResponse.token;

    const createPayload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(createPayload);

    const updatePayload = BookingData.createBookingPayload({
      firstname: 'Updated',
      lastname: 'User',
      totalprice: 999,
      depositpaid: false,
      additionalneeds: 'Dinner'
    });

    const updatedBooking = await bookingAPI.updateBooking(createdBooking.bookingid, updatePayload, token);

    expect(updatedBooking.firstname).toBe(updatePayload.firstname);
    expect(updatedBooking.lastname).toBe(updatePayload.lastname);
    expect(updatedBooking.totalprice).toBe(updatePayload.totalprice);
    expect(updatedBooking.depositpaid).toBe(updatePayload.depositpaid);
    expect(updatedBooking.additionalneeds).toBe(updatePayload.additionalneeds);
  });

  test('should fail update without token', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const createPayload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(createPayload);

    const updatePayload = BookingData.createBookingPayload({
      firstname: 'Unauthorized'
    });

    const response = await bookingAPI.updateBookingResponse(createdBooking.bookingid, updatePayload);

    expect(response.status()).toBe(403);
  });
});
