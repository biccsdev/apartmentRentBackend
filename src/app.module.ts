import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { ApartmentModule } from './apartment/apartment.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [AuthenticationModule, UserModule, BookingModule, ApartmentModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
