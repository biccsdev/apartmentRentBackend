import { DynamicModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { BookingModule } from 'src/booking/booking.module';
import { Booking } from 'src/booking/booking.schema';

export const userModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync(
    [
      {
        imports: [BookingModule],
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.virtual('booking', {
            ref: Booking.name,
            localField: '_booking',
            foreignField: '_id',
            justOne: false,
          });

          return schema;
        },
        inject: [],
      },
    ],
    'user',
  ),
];

@Module({
  imports: [...userModuleMongooseModules],
  exports: [...userModuleMongooseModules],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
