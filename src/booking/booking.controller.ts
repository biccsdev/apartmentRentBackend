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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BOOKING_STATUS, BookingDocument } from './booking.schema';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateBookingDTO } from './createBooking.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/authentication/admin.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { ROLES } from 'src/user/user.schema';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createBookingDto: CreateBookingDTO,
  ): Promise<BookingDocument> {
    try {
      const booking = await this.bookingService.create(files, createBookingDto);
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

  // @UseGuards(JwtAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @Delete(':_id')
  // async delete(@Param() param: string): Promise<any> {
  //   try {
  //     const booking = await this.bookingService.delete(param);
  //     return booking;
  //   } catch (error) {
  //     console.log(error);
  //     throw new BadRequestException(error);
  //   }
  // }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/review/:_id')
  @Roles(ROLES.ADMIN)
  async review(
    @Param() param: string,
    @Body() updatedStatus: any,
  ): Promise<any> {
    try {
      const booking = await this.bookingService.review(
        param,
        updatedStatus.updatedStatus,
      );
      return booking;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
