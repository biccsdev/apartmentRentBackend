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
import { ApartmentService } from './apartment.service';
import { ApartmentDocument } from './apartment.schema';
import { CreateApartmentDTO } from './createApartment.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AdminGuard } from 'src/authentication/admin.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { ROLES } from 'src/user/user.schema';

@Controller('apartment')
export class ApartmentController {
  constructor(private apartmentService: ApartmentService) {}

  @Get('/unlocked')
  @HttpCode(HttpStatus.OK)
  async findUnlocked(): Promise<ApartmentDocument[]> {
    try {
      const apartment = await this.apartmentService.findUnlocked({});
      return apartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @Roles(ROLES.ADMIN)
  @HttpCode(HttpStatus.OK)
  async create(
    @Body()
    createApartmentDto: CreateApartmentDTO,
  ): Promise<ApartmentDocument> {
    try {
      const apartment = await this.apartmentService.create(createApartmentDto);
      return apartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:_id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param() param: string): Promise<ApartmentDocument> {
    try {
      const apartment = await this.apartmentService.findById(param);
      return apartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async find(): Promise<ApartmentDocument[]> {
    try {
      const apartment = await this.apartmentService.find({});
      return apartment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch('/:_id')
  @Roles(ROLES.ADMIN)
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

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('/:_id')
  @Roles(ROLES.ADMIN)
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
