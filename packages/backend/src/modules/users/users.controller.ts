import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
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

  @Get(':id')
  @Roles(Role.Admin)
  async getUser(@Param('id') id: string) {
    return this.usersService.user({ id: +id });
  }

  @Post()
  @Roles(Role.Admin)
  async createUser(@Body() body: Prisma.UserCreateManyInput) {
    return this.usersService.createUser(body);
  }

  @Put()
  @Roles(Role.Admin)
  async updateUser(@Body() body: User) {
    return this.usersService.updateUser(body);
  }
}
