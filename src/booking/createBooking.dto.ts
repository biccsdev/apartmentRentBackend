import { BOOKING_STATUS } from './booking.schema';

export class CreateBookingDTO {
  _apartment: string;
  _user: string;
  arriveDate: Date;
  leaveDate: Date;
}
