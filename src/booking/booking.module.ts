import { DynamicModule, Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ApartmentModule } from 'src/apartment/apartment.module';
import { User } from 'src/user/user.schema';
import { Apartment } from 'src/apartment/apartment.schema';

export const bookingModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync(
    [
      {
        imports: [UserModule, ApartmentModule],
        name: Booking.name,
        useFactory: () => {
          const schema = BookingSchema;

          schema.virtual('User', {
            ref: User.name,
            localField: '_user',
            foreignField: '_id',
            justOne: true,
          });

          schema.virtual('Apartment', {
            ref: Apartment.name,
            localField: '_apartment',
            foreignField: '_id',
            justOne: true,
          });

          return schema;
        },
        inject: [],
      },
    ],
    'booking',
  ),
];

@Module({
  imports: [...bookingModuleMongooseModules],
  exports: [...bookingModuleMongooseModules],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
