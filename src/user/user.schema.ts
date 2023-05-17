import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Booking } from 'src/booking/booking.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  _booking: Types.ObjectId[];

  @Prop()
  booking: Booking[];
}

export const UserSchema = SchemaFactory.createForClass(User);
