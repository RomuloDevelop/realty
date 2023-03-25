import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Role } from 'src/common/constants';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import Hashing from 'src/common/utils/hashing';
import { Paginator } from 'types/paginator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(@Body() body: Paginator) {
    return this.usersService.users(body);
  }

  @Post()
  @Roles(Role.Admin)
  async createUser(@Body() body: Prisma.UsersCreateManyInput) {
    //return this.usersService.createUser(body);

    return 'hello';
  }
}
