import { DynamicModule, Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { BookingModule } from 'src/booking/booking.module';
import { Booking } from 'src/booking/booking.schema';

export const userModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync([
    {
      imports: [forwardRef(() => BookingModule)],
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
  ]),
];

@Module({
  imports: [...userModuleMongooseModules],
  exports: [...userModuleMongooseModules, UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
