import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../pages/api/booking.api';
import { BookingData } from '../../pages/data/booking.data';

test.describe('Booking GET API', () => {
  test('should get all booking ids', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const bookingIds = await bookingAPI.getBookingIds();

    expect(Array.isArray(bookingIds)).toBe(true);
    expect(bookingIds.length).toBeGreaterThan(0);
    expect(bookingIds[0]).toHaveProperty('bookingid');
  });

  test('should get booking ids using filters', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const filters = BookingData.createBookingSearchParams({
      firstname: 'Sally',
      lastname: 'Brown'
    });

    const bookingIds = await bookingAPI.getBookingIds(filters);

    expect(Array.isArray(bookingIds)).toBe(true);
  });

  test('should get booking by id after creating a booking', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const payload = BookingData.createBookingPayload();
    const createdBooking = await bookingAPI.createBooking(payload);

    const fetchedBooking = await bookingAPI.getBookingById(createdBooking.bookingid);

    expect(fetchedBooking.firstname).toBe(payload.firstname);
    expect(fetchedBooking.lastname).toBe(payload.lastname);
    expect(fetchedBooking.totalprice).toBe(payload.totalprice);
    expect(fetchedBooking.depositpaid).toBe(payload.depositpaid);
  });

  test('should return 404 for invalid booking id', async ({ request }) => {
    const bookingAPI = new BookingAPI(request);

    const response = await bookingAPI.getBookingByIdResponse(99999999);

    expect(response.status()).toBe(404);
  });
});
