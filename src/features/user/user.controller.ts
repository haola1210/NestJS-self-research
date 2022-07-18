import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  // only admin can get users
  @Get()
  @Roles(UserRole.ADMIN) // set role admin to this route
  @UseGuards(RolesGuard) // add a guard to protect this route
  async getAllUser() {
    return this.userService.getAllUser();
  }
}
