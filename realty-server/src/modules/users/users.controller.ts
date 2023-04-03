import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Role } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Paginator } from 'types/paginator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  async getUsers(@Body() body: Paginator) {
    return this.usersService.users(body);
  }

  @Post()
  @Roles(Role.Admin)
  async createUser(@Body() body: Prisma.UsersCreateManyInput) {
    return this.usersService.createUser(body);
  }
}
