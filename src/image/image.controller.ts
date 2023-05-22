import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AdminGuard } from 'src/authentication/admin.guard';
import { Roles } from 'src/authentication/roles.decorator';
import { ROLES } from 'src/user/user.schema';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('upload')
  @Roles(ROLES.ADMIN)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() _apartment: string,
  ) {
    try {
      const fileUploaded = await this.imageService.upload(_apartment, files);
      return 'Successfully uploaded all your files.';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('payment')
  async uploadPaymentFile(
    @UploadedFile() files: Express.Multer.File,
    @Body() _booking: string,
  ) {
    try {
      const fileUploaded = await this.imageService.uploadPayment(
        _booking,
        files,
      );
      return 'Successfully uploaded you payment file.';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:name')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  async getStaticFile(@Param() param: any): Promise<any> {
    try {
      const file = await this.imageService.find(param.name);
      return file;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
