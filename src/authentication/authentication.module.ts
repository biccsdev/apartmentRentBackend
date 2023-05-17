import { Module } from '@nestjs/common';
import { AuthController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
