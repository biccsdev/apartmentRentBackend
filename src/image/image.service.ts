import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageDocument, ImageUpload } from './image.schema';
import { Model } from 'mongoose';
import { UploadImageDTO } from './uploadImage.dto';
import { ApartmentService } from 'src/apartment/apartment.service';
import { CreateApartmentDTO } from 'src/apartment/createApartment.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(ImageUpload.name) private imageModel: Model<ImageDocument>,
    private apartmentService: ApartmentService,
  ) {}

  async upload(
    _apartment: string,
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    const apartment = await this.apartmentService.findById(_apartment);
    const filesDto: UploadImageDTO[] = files.map((item) => {
      return {
        name: _apartment,
        data: item.buffer,
        contentType: item.mimetype,
      };
    });
    let aps = [];
    const element = filesDto[0];
    const image = new this.imageModel(element);
    apartment.photosUrls.push(image);
    aps.push(image._id.toString());
    const dto: CreateApartmentDTO = { _photosUrls: aps };
    await this.apartmentService.update(apartment._id.toString(), dto);
    return image.save();
  }

  async uploadPayment(_booking: string, file: Express.Multer.File) {
    return new this.imageModel({
      name: _booking,
      data: file.buffer,
      contentType: file.mimetype,
    }).save();
  }

  async find(_id: string): Promise<any> {
    const images = await this.imageModel.findById(_id);
    return images;
  }
}
