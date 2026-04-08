import { BookingPayload, BookingSearchParams } from '../../utils/bookInterface';
import { DateUtil } from '../../utils/date';

export class BookingData {
  static createBookingPayload(overrides: Partial<BookingPayload> = {}): BookingPayload {
    return {
      firstname: 'Maaz',
      lastname: 'Ali',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: DateUtil.addDays(1),
        checkout: DateUtil.addDays(5)
      },
      additionalneeds: 'Breakfast',
      ...overrides
    };
  }

  static createBookingSearchParams(overrides: Partial<BookingSearchParams> = {}): BookingSearchParams {
    return {
      firstname: 'Maaz',
      lastname: 'Ali',
      checkin: DateUtil.addDays(1),
      checkout: DateUtil.addDays(5),
      ...overrides
    };
  }
}
