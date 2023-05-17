import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { ApartmentModule } from './apartment/apartment.module';
import { ImageModule } from './image/image.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://biccsdev:Kondas123@cluster0.ihoyt.mongodb.net/Apartments/users?retryWrites=true&w=majority',
      {
        connectionName: 'user',
      },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://biccsdev:Kondas123@cluster0.ihoyt.mongodb.net/Apartments/apartment?retryWrites=true&w=majority',
      {
        connectionName: 'apartment',
      },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://biccsdev:Kondas123@cluster0.ihoyt.mongodb.net/Apartments/image?retryWrites=true&w=majority',
      {
        connectionName: 'image',
      },
    ),
    MongooseModule.forRoot(
      'mongodb+srv://biccsdev:Kondas123@cluster0.ihoyt.mongodb.net/Apartments/booking?retryWrites=true&w=majority',
      {
        connectionName: 'booking',
      },
    ),
    ,
    AuthenticationModule,
    UserModule,
    BookingModule,
    ApartmentModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
