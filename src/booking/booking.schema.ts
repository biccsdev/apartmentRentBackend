import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Apartment } from 'src/apartment/apartment.schema';
import { User } from 'src/user/user.schema';

export type BookingDocument = HydratedDocument<Booking>;

export enum BOOKING_STATUS {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: false }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true, getters: false }, // So `toObject()` output includes virtuals
})
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'Apartment' })
  _apartment: Types.ObjectId;

  @Prop()
  apartment: Apartment;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  _user: Types.ObjectId;

  @Prop()
  user: User;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop()
  arriveDate: Date;

  @Prop()
  leaveDate: Date;

  @Prop()
  totalCost: number;

  @Prop()
  paymentProof?: string;

  @Prop({
    type: String,
    required: true,
    enum: BOOKING_STATUS,
  })
  status: BOOKING_STATUS;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
