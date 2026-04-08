import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../pages/api/booking.api';
import { BookingData } from '../../pages/data/booking.data';

test.describe('Booking CREATE API', () => {
  test('should create a new booking', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const payload = BookingData.createBookingPayload();
    const response = await bookingAPI.createBooking(payload);

    expect(response.bookingid).toBeGreaterThan(0);
    expect(response.booking.firstname).toBe(payload.firstname);
    expect(response.booking.lastname).toBe(payload.lastname);
    expect(response.booking.totalprice).toBe(payload.totalprice);
    expect(response.booking.depositpaid).toBe(payload.depositpaid);
    expect(response.booking.bookingdates.checkin).toBe(payload.bookingdates.checkin);
    expect(response.booking.bookingdates.checkout).toBe(payload.bookingdates.checkout);
  });
});
