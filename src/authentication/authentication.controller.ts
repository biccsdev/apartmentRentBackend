import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserDocument } from 'src/user/user.schema';
import { CreateUserDTO } from 'src/user/createUser.dto';
import { SignInDTO } from './signIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthenticationService) {}

  @Public()
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

  @Public()
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
}
