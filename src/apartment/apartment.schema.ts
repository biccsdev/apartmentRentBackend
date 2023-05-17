import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ImageUpload } from 'src/image/image.schema';

export type ApartmentDocument = HydratedDocument<Apartment>;

export class Coordinates {
  latitude: number;
  longitude: number;
}

@Schema()
export class Apartment {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'ImageUpload' })
  _thumbnail: Types.ObjectId;

  @Prop()
  thumbnail: ImageUpload;

  @Prop({ type: Types.ObjectId, ref: 'ImageUpload' })
  _photosUrls: Types.ObjectId[];

  @Prop()
  photosUrls: ImageUpload[];

  @Prop()
  highlights: string[];

  @Prop()
  about: string;

  @Prop()
  amenities: string[];

  @Prop()
  map: Coordinates;

  @Prop()
  unAvailableDays: Date[];

  @Prop()
  pricePerNight: number;

  @Prop()
  rules: string[];

  // @Prop()
  // reviews: Reviews[]
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
