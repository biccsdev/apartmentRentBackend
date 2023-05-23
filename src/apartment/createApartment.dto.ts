import { ImageUpload } from 'src/image/image.schema';
import { Coordinates } from './apartment.schema';

export class CreateApartmentDTO {
  _id?: string;
  title?: string;
  description?: string;
  _thumbnail?: string;
  _photosUrls?: string[];
  highlights?: string[];
  about?: string;
  keyBoxPassword?: string;
  location?: string;
  amenities?: string[];
  map?: Coordinates;
  unAvailableDays?: string[];
  pricePerNight?: number;
  rules?: string[];
}
