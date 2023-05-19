import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UploadImageDTO } from './uploadImage.dto';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() apartmentName: any,
  ) {
    try {
      const fileUploaded = await this.imageService.upload(
        apartmentName.apartmentName,
        files,
      );
      return 'Successfully uploaded all your files.';
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

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
