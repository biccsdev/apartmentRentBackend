import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { randomBytes } from 'crypto';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Booking } from 'src/booking/booking.schema';

export enum ROLES {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ required: false, type: String, hide: true })
  hash?: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop({ type: Types.ObjectId, ref: 'Booking' })
  _booking?: Types.ObjectId[];

  @Prop({
    type: String,
    required: true,
    enum: ROLES,
  })
  role: ROLES;

  // @Prop({ required: false, type: String, default: null })
  // confirmAccountToken?: string;

  // @Prop()
  // booking: Booking[];

  generatePassword?: IGeneratePasswordFunction;
  generateConfirmAccountToken?: IGenerateConfirmAccountTokenFunction;
  generateResetPasswordToken?: IGenerateResetPasswordTokenTokenFunction;
  validatePassword?: IValidatePasswordFunction;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

interface IGeneratePasswordFunction {
  (password: string): Promise<string>;
}
interface IValidatePasswordFunction {
  (password: string): Promise<boolean>;
}
interface IGenerateConfirmAccountTokenFunction {
  (): string;
}
type IGenerateResetPasswordTokenTokenFunction =
  IGenerateConfirmAccountTokenFunction;

UserSchema.method({
  generatePassword: async function (password: string): Promise<string> {
    if (!password) throw new Error('MUST PROVIDE VALID PASSWORD');
    return await hash(password, 10);
  },
  validatePassword: async function (password: string): Promise<boolean> {
    return compare(password, (this as UserDocument).hash);
  },

  generateResetPasswordToken: function () {
    return randomBytes(16).toString('hex');
  },
  generateConfirmAccountToken: function () {
    return this._id;
  },
});
