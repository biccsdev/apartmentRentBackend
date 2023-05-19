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

  async find(): Promise<ApartmentDocument[]> {
    return await this.apartmentModel.find({});
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
