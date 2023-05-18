import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDocument } from './booking.schema';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateBookingDTO } from './createBooking.dto';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createBookingDto: CreateBookingDTO,
  ): Promise<BookingDocument> {
    try {
      const booking = await this.bookingService.create(createBookingDto);
      return booking;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async find(@Body() body: {}): Promise<BookingDocument[]> {
    try {
      const booking = await this.bookingService.find(body);
      return booking;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:_id')
  async findById(@Param() param: string): Promise<BookingDocument> {
    try {
      const booking = await this.bookingService.findById(param);
      return booking;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/:_id')
  async update(
    @Param() param: string,
    @Body() createBookingDto: CreateBookingDTO,
  ): Promise<BookingDocument> {
    try {
      const booking = await this.bookingService.update(param, createBookingDto);
      return booking;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':_id')
  async delete(@Param() param: string): Promise<any> {
    try {
      const booking = await this.bookingService.delete(param);
      return booking;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
