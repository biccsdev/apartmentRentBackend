import { DynamicModule, Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ApartmentModule } from 'src/apartment/apartment.module';
import { User } from 'src/user/user.schema';
import { Apartment } from 'src/apartment/apartment.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/constants';
import { JwtStrategy } from 'src/authentication/jwt.strategy';
import { Review, ReviewSchema } from './review.schema';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

export const reviewModuleMongooseModules: DynamicModule[] = [
  MongooseModule.forFeatureAsync([
    {
      imports: [forwardRef(() => UserModule), ApartmentModule],
      name: Review.name,
      useFactory: () => {
        const schema = ReviewSchema;

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
    ...reviewModuleMongooseModules,
    PassportModule,
    ApartmentModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [...reviewModuleMongooseModules],
  controllers: [ReviewController],
  providers: [ReviewService, JwtStrategy],
})
export class ReviewModule {}
