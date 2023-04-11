import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Role } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Paginator } from 'types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  async getUsers(@Query() query: Paginator) {
    return this.usersService.users(query);
  }

  @Post()
  @Roles(Role.Admin)
  async createUser(@Body() body: Prisma.UserCreateManyInput) {
    return this.usersService.createUser(body);
  }
}
