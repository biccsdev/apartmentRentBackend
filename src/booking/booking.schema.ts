import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Apartment } from 'src/apartment/apartment.schema';
import { User } from 'src/user/user.schema';

export type BookingDocument = HydratedDocument<Booking>;

export enum BOOKING_STATUS {
  PENDING,
  ACCEPTED,
}

@Schema()
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Apartment' })
  _apartment: Types.ObjectId;

  @Prop()
  apartment: Apartment;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  _user: Types.ObjectId;

  @Prop()
  user: User;

  @Prop()
  arriveDate: Date;

  @Prop()
  leaveDate: Date;

  @Prop()
  totalCost: number;

  @Prop({
    type: String,
    required: true,
    enum: BOOKING_STATUS,
  })
  status: BOOKING_STATUS;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
