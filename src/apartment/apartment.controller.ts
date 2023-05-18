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
} from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApartmentDocument } from './apartment.schema';
import { CreateApartmentDTO } from './createApartment.dto';

@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentService: ApartmentService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    createApartmentDto: CreateApartmentDTO,
  ): Promise<ApartmentDocument> {
    try {
      const apartment = await this.apartmentService.create(createApartmentDto);
      return apartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/:_id')
  @HttpCode(HttpStatus.OK)
  async find(@Param() param: string): Promise<ApartmentDocument> {
    try {
      const apartment = await this.apartmentService.findById(param);
      return apartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Patch('/:_id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param() param: string,
    @Body() updateApartmentDto: CreateApartmentDTO,
  ): Promise<ApartmentDocument> {
    try {
      const apartmentUpdated = await this.apartmentService.update(
        param,
        updateApartmentDto,
      );
      return apartmentUpdated;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete('/:_id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param() param: string): Promise<any> {
    try {
      const deletedApartment = await this.apartmentService.delete(param);
      return deletedApartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
