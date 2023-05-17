import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<ImageUpload>;

@Schema()
export class ImageUpload {
  @Prop()
  name: string;

  @Prop()
  imageUrl: string;
}

export const ImageSchema = SchemaFactory.createForClass(ImageUpload);
