import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  account: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
