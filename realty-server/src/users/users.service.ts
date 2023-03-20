import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Paginator } from '../../types/paginator';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(uniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: uniqueInput,
    });
  }

  async users(params: Paginator) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async usersByRole(roleId: number) {
    return this.prisma.user.findMany({
      where: {
        roleId,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}