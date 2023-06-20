import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Apartment, ApartmentDocument } from './apartment.schema';
import { Model } from 'mongoose';
import { CreateApartmentDTO } from './createApartment.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectModel(Apartment.name)
    private apartmentModel: Model<ApartmentDocument>,
  ) {}

  async create(
    createApartmentDto: CreateApartmentDTO,
  ): Promise<ApartmentDocument> {
    const apartment = new this.apartmentModel(createApartmentDto);
    return apartment.save();
  }

  async findById(_id: string): Promise<ApartmentDocument> {
    return await this.apartmentModel.findById(_id);
  }

  async findUnlocked(param: {}): Promise<ApartmentDocument[]> {
    const res = await this.apartmentModel
      .find(param)
      .select(
        'title description highlights about location amenities map unAvailableDays pricePerNight rules',
      );
    return res;
  }

  async find(param: {}): Promise<ApartmentDocument[]> {
    return await this.apartmentModel.find(param);
  }

  async update(
    _id: string,
    createApartmentDto: CreateApartmentDTO,
  ): Promise<ApartmentDocument> {
    const apartmentUpdated = await this.apartmentModel.findByIdAndUpdate(
      _id,
      createApartmentDto,
    );
    return apartmentUpdated;
  }

  async delete(_id: string): Promise<any> {
    return await this.apartmentModel.deleteOne({ _id: _id });
  }
}
