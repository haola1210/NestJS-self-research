import { SignInDto } from './dtos/sign-in.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signup')
  async signup(@Body() signUpDto: SignUpDto) {
    // create a new user in database
    const user = await this.userService.createUser(signUpDto);
    // generate access token
    const accessToken = await this.authService.generateAccessToken({
      id: user.id,
      name: user.name,
      account: user.account,
      role: user.role,
    });
    return {
      accessToken,
    };
  }

  @Post('/signin')
  async signin(@Body() signInDto: SignInDto) {
    // find and verify the user with received data
    const user = await this.userService.findAndVerify(signInDto);

    // generate access token
    const accessToken = await this.authService.generateAccessToken({
      id: user.id,
      name: user.name,
      account: user.account,
      role: user.role,
    });
    return {
      accessToken,
    };
  }
}
