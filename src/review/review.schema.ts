import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Apartment } from 'src/apartment/apartment.schema';
import { User } from 'src/user/user.schema';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, getters: false }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true, getters: false }, // So `toObject()` output includes virtuals
})
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  _user: Types.ObjectId;

  @Prop()
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Apartment' })
  _apartment: Types.ObjectId;

  @Prop()
  apartment: Apartment;

  @Prop()
  comment: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
