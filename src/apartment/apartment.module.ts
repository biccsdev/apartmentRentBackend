import { DynamicModule, Module, forwardRef } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';
import { Apartment, ApartmentSchema } from './apartment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from 'src/image/image.module';
import { ImageUpload } from 'src/image/image.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/constants';
import { JwtStrategy } from 'src/authentication/jwt.strategy';
import { UserModule } from 'src/user/user.module';

export const apartmentModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync([
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
  ]),
];

@Module({
  imports: [
    ...apartmentModuleMongooseModules,
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [...apartmentModuleMongooseModules, ApartmentService],
  controllers: [ApartmentController],
  providers: [ApartmentService, JwtStrategy],
})
export class ApartmentModule {}
