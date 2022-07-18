import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { AttachedUserRequest } from './interfaces/attached-user-request.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get roles of route
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    // get user from req
    const request = context.switchToHttp().getRequest() as AttachedUserRequest;

    const user = request.user;
    if (!user) {
      throw new UnauthorizedException();
    }

    // does user have role?
    return roles.includes(user.role);
  }
}
