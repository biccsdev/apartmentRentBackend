import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImageDocument, ImageUpload } from './image.schema';
import { Model } from 'mongoose';
import { UploadImageDTO } from './uploadImage.dto';
import { createReadStream } from 'fs';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(ImageUpload.name) private imageModel: Model<ImageDocument>,
  ) {}

  async upload(
    apartmentName: string,
    files: Array<Express.Multer.File>,
  ): Promise<UploadImageDTO[]> {
    const filesDto: UploadImageDTO[] = files.map((item) => {
      return {
        name: apartmentName,
        data: item.buffer,
        contentType: item.mimetype,
      };
    });
    filesDto.map(async (item) => await new this.imageModel(item).save());
    // const image = { data: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype }
    // const savedImage = await ImageModel.create(image);
    return filesDto;
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
