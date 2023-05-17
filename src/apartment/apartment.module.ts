import { DynamicModule, Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { Apartment, ApartmentSchema } from './apartment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from 'src/image/image.module';
import { ImageUpload } from 'src/image/image.schema';

export const apartmentModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync(
    [
      {
        imports: [ImageModule],
        name: Apartment.name,
        useFactory: () => {
          const schema = ApartmentSchema;

          schema.virtual('ImageUpload', {
            ref: ImageUpload.name,
            localField: '_thumbnail',
            foreignField: '_id',
            justOne: true,
          });

          schema.virtual('ImageUpload', {
            ref: ImageUpload.name,
            localField: '_photosUrls',
            foreignField: '_id',
            justOne: false,
          });

          return schema;
        },
        inject: [],
      },
    ],
    'apartment',
  ),
];

@Module({
  imports: [...apartmentModuleMongooseModules],
  exports: [...apartmentModuleMongooseModules],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
