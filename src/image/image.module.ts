import { Module, forwardRef } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageSchema, ImageUpload } from './image.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentModule } from 'src/apartment/apartment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageSchema },
    ]),
    // PassportModule,
    forwardRef(() => ApartmentModule),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageSchema },
    ]),
    ImageService,
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
