import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/createUser.dto';
import { UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { hash } from 'bcrypt';
import { SignInDTO } from './signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDTO): Promise<UserDocument> {
    if (createUserDto.password !== createUserDto.repeatPassword) {
      throw new BadRequestException("Passwords don't match.");
    }
    const allUsers = await this.userService.findAll();
    allUsers.map((item) => {
      if (item.email === createUserDto.email.toLowerCase()) {
        throw new BadRequestException('Email is already in use.');
      }
    });
    const createUser = {
      name: createUserDto.name,

      password: createUserDto.password,

      repeatPassword: createUserDto.repeatPassword,

      email: createUserDto.email.toLowerCase(),

      phoneNumber: createUserDto.phoneNumber,
    };
    const user = await this.userService.create(createUser);
    return user;
  }

  async signIn(signInDto: SignInDTO): Promise<any> {
    const user = await this.userService.findOne({
      email: signInDto.email.toLowerCase(),
    });
    if (!(await user.validatePassword(signInDto.password))) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user._id };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email: email.toLowerCase() });
    if (user && (await user.validatePassword(pass))) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userService.findAll();
  }
}
