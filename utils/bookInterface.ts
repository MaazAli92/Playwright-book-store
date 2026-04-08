export type SelectedBookDetails = {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publish_date: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
};

export type AuthRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type BookingDates = {
  checkin: string;
  checkout: string;
};

export type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
};

export type CreateBookingResponse = {
  bookingid: number;
  booking: BookingPayload;
};

export type BookingIdItem = {
  bookingid: number;
};

export type BookingSearchParams = {
  firstname?: string;
  lastname?: string;
  checkin?: string;
  checkout?: string;
};
