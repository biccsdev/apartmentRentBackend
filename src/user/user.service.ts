import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ROLES, User, UserDocument } from './user.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateUserDTO } from './createUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDTO): Promise<UserDocument> {
    const newUser = new this.userModel(userDto);
    newUser.role = ROLES.CLIENT;
    newUser.hash = await newUser.generatePassword(userDto.password);
    return newUser.save();
  }

  async findOne(filter: FilterQuery<UserDocument>): Promise<UserDocument> {
    return this.userModel.findOne(filter);
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById({ _id: new Types.ObjectId(id) });
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find({});
  }

  //Finds an user by its id, and deletes it, returns a string upon being deleted.
  async delete(id: string): Promise<string> {
    if (await this.exists(id)) {
      await this.userModel.deleteOne({ _id: id });
      return 'Deleted Successfully';
    } else {
      throw new ForbiddenException("The ID given, doesn't match any user.");
    }
  }

  async exists(id: string): Promise<Boolean> {
    if (await this.userModel.findOne({ _id: id })) {
      return true;
    }
    return false;
  }
}
