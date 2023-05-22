import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ROLES, UserDocument } from 'src/user/user.schema';
import { CreateUserDTO } from 'src/user/createUser.dto';
import { SignInDTO } from './signIn.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from './admin.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDTO): Promise<UserDocument> {
    try {
      const user = await this.authService.register(createUserDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDTO): Promise<any> {
    try {
      const user = await this.authService.signIn(signInDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  @Roles(ROLES.ADMIN)
  async getAllRegisteredUsers(): Promise<UserDocument[]> {
    try {
      const users = await this.authService.findAll();
      return users;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
