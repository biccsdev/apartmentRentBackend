import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageDocument, ImageUpload } from './image.schema';
import { Model } from 'mongoose';
import { UploadImageDTO } from './uploadImage.dto';
import { createReadStream } from 'fs';
import { ApartmentService } from 'src/apartment/apartment.service';

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
    for (let i = 0; i < filesDto.length; i++) {
      const element = filesDto[i];
      const image = new this.imageModel(element);
      apartment.photosUrls.push(image);
      image.save();
    }
    // const savedImages = filesDto.map((item) => {
    //   return new this.imageModel(item).save();
    // });
    // const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
    // const savedImage = await ImageModel.create(image);
    return apartment.photosUrls;
  }

  async uploadPayment(_booking: string, file: Express.Multer.File) {
    return new this.imageModel({
      name: _booking,
      data: file.buffer,
      contentType: file.mimetype,
    }).save();
  }

  async find(name: string): Promise<any> {
    const images = await this.imageModel.find({ name: name });
    // console.log(images);
    // const readStreamArr = images.map(
    //   (item) => new StreamableFile(createReadStream(item.data)),
    // );
    return images;
  }
}
