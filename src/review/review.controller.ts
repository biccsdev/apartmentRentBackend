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
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { CreateReviewDTO } from './createReview.dto';
import { ReviewDocument } from './review.schema';
import { AdminGuard } from 'src/authentication/admin.guard';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async create(
    @Body() createReviewDTO: CreateReviewDTO,
  ): Promise<ReviewDocument> {
    try {
      const review = await this.reviewService.create(createReviewDTO);
      return review;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/apartment/:_id')
  async findByApartment(@Param() param: any): Promise<ReviewDocument[]> {
    try {
      const reviews = await this.reviewService.find({ _apartment: param._id });
      return reviews;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/user/:_id')
  async findByCreator(@Param() param: any): Promise<ReviewDocument[]> {
    try {
      const reviews = await this.reviewService.find({ _user: param._id });
      return reviews;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('/:_id')
  async update(
    @Param() param: any,
    @Body() comment: string,
  ): Promise<ReviewDocument> {
    try {
      const review = await this.reviewService.update(param._id, comment);
      return review;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/:_id')
  async delete(@Param() param: string): Promise<ReviewDocument> {
    try {
      const review = await this.reviewService.delete(param);
      return review;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
