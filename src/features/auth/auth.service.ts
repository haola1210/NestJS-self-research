import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISharedFieldsUser } from 'src/common/interfaces/shared-fields-user.interface';
import { sign, verify } from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private JWTSecret: string;
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.JWTSecret = this.configService.get('JWT_SECRET');
  }

  async generateAccessToken(data: ISharedFieldsUser) {
    console.log(data);
    const accessToken = sign(data, this.JWTSecret, {
      expiresIn: '2m',
    });
    return accessToken;
  }

  async verifyAccessToken(accessToken: string) {
    try {
      // verify AT
      const decoded = verify(accessToken, this.JWTSecret) as ISharedFieldsUser;
      if (!decoded) throw new Error();

      // find user in database
      const user = await this.userService.getUserById(decoded.id);
      if (!user) throw new Error();

      // return needed information
      const { id, name, account, role } = user;
      return { id, name, account, role } as ISharedFieldsUser;
      //
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
