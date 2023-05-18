import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { Model } from 'mongoose';
import { CreateApartmentDTO } from 'src/apartment/createApartment.dto';
import { CreateBookingDTO } from './createBooking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDTO): Promise<BookingDocument> {
    const booking = new this.bookingModel(createBookingDto);
    return booking;
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
