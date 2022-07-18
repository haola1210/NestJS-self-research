import { SignInDto } from './../auth/dtos/sign-in.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, account, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      name,
      account,
      password: hashedPassword,
    };
    try {
      const user = await this.prisma.user.create({
        data,
      });
      //
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        // duplicate account
        throw new ConflictException('Account was used!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getAllUser(): Promise<Partial<User>[]> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        account: true,
        role: true,
        todos: true,
      },
    });
  }

  async getUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAndVerify(signInDto: SignInDto) {
    const { account, password } = signInDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          account,
        },
      });
      if (!user) throw new Error();

      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        return user;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
