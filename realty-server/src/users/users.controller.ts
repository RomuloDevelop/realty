import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Paginator } from 'types/paginator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Body() body: Paginator) {
    return this.usersService.users(body);
  }

  @Post()
  createUser(@Body() body: Prisma.UsersCreateInput) {
    return this.usersService.createUser(body);
  }
}
