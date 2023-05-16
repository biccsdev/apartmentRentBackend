import { Module } from '@nestjs/common';
import { AuthController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  controllers: [AuthController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
