import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AttachedUserRequest } from './interfaces/attached-user-request.interface';

/**
 * ### This Guard is use for ensuring a route can not be access without authorization
 * ##### You can access `user` property in `request` whenever this guard is binded to a route
 * - use `AttachedUserRequest` instead of  `Request` for type of `request` in controller
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const authorizationHeader: string = request.headers['authorization'];
      if (!authorizationHeader) throw new Error();

      const accessToken = authorizationHeader.split(' ')[1];
      // call verify in AuthService
      const user = await this.authService.verifyAccessToken(accessToken);
      // attach user information to request for the role guard using.
      (request as AttachedUserRequest).user = user;
      return true;
      //
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
