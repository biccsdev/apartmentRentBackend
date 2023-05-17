import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageSchema, ImageUpload } from './image.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageSchema },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageSchema },
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
