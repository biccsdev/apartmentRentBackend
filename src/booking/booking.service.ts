import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BOOKING_STATUS, Booking, BookingDocument } from './booking.schema';
import { Model } from 'mongoose';
import { CreateApartmentDTO } from 'src/apartment/createApartment.dto';
import { CreateBookingDTO } from './createBooking.dto';
import { ApartmentService } from 'src/apartment/apartment.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    private apartmentService: ApartmentService,
    private userService: UserService,
  ) {}

  async create(createBookingDto: CreateBookingDTO): Promise<BookingDocument> {
    const ap = await this.apartmentService.findById(
      createBookingDto._apartment,
    );
    const us = await this.userService.findById(createBookingDto._user);

    const booking = new this.bookingModel(createBookingDto);
    booking.apartment = ap;
    booking.user = us;
    booking.leaveDate = new Date(createBookingDto.leaveDate);
    booking.arriveDate = new Date(createBookingDto.arriveDate);

    const timeDiff = Math.abs(
      booking.leaveDate.getTime() - booking.arriveDate.getTime(),
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    booking.totalCost = diffDays * booking.apartment.pricePerNight;
    booking.status = BOOKING_STATUS.PENDING;
    return booking.save();
  }
  async find(params: {}): Promise<BookingDocument[]> {
    return await this.bookingModel.find(params);
  }
  async findById(id: string): Promise<BookingDocument> {
    return await this.bookingModel.findById(id);
  }
  async update(
    id: string,
    createBookingDto: CreateBookingDTO,
  ): Promise<BookingDocument> {
    return await this.bookingModel.findByIdAndUpdate(id, createBookingDto);
  }
  async delete(id: string): Promise<any> {
    return await this.bookingModel.deleteOne({ _id: id });
  }
}
