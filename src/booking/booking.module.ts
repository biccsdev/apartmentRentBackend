import { DynamicModule, Module, forwardRef } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from './booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ApartmentModule } from 'src/apartment/apartment.module';
import { User } from 'src/user/user.schema';
import { Apartment } from 'src/apartment/apartment.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/constants';
import { JwtStrategy } from 'src/authentication/jwt.strategy';
import { ImageModule } from 'src/image/image.module';

export const bookingModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync([
    {
      imports: [forwardRef(() => UserModule), ApartmentModule],
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
  ]),
];

@Module({
  imports: [
    ...bookingModuleMongooseModules,
    PassportModule,
    ApartmentModule,
    ImageModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [...bookingModuleMongooseModules],
  controllers: [BookingController],
  providers: [BookingService, JwtStrategy],
})
export class BookingModule {}
