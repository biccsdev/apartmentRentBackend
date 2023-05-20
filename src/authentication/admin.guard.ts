import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/user/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ROLES[]>('roles', context.getHandler());

    if (!roles || !roles.includes(ROLES.ADMIN)) {
      return true; // Allow access if no roles are specified or if the ADMIN role is not required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming the user object is available in the request

    return user && user.role === ROLES.ADMIN;
  }
}
