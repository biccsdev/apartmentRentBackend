import { Module, forwardRef } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageSchema, ImageUpload } from './image.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/authentication/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/authentication/local.strategy';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageSchema },
    ]),
    // PassportModule,
    // forwardRef(() => AuthenticationModule),
  ],
  exports: [
    MongooseModule.forFeature([
      { name: ImageUpload.name, schema: ImageSchema },
    ]),
    ImageService,
  ],
  controllers: [ImageController],
  providers: [
    ImageService,
    // LocalStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class ImageModule {}
