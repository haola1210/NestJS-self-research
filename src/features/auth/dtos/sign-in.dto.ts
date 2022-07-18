import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  account: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
