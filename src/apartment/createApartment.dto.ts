import { ImageUpload } from 'src/image/image.schema';
import { Coordinates } from './apartment.schema';

export class CreateApartmentDTO {
  _id?: string;
  title?: string;
  description?: string;
  _thumbnail?: ImageUpload;
  photosUrls?: ImageUpload[];
  highlights: string[];
  about: string;
  ameneties: string[];
  map: Coordinates;
  unAvailableDays: Date[];
  pricePerNight: number;
  rules: string[];
}
