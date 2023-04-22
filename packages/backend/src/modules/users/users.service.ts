import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import Hashing from 'src/common/utils/hashing';
import { Paginator } from 'types';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(uniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: uniqueInput,
    });
  }

  async users(params: Paginator) {
    const { page, perPage } = params;
    const pageNum = parseInt(page);
    const perPageNum = parseInt(perPage);

    return this.prisma.user.findMany({
      skip: pageNum * perPageNum,
      take: perPageNum,
    });
  }

  async usersByRole(roleId: number) {
    return this.prisma.user.findMany({
      where: {
        roleId,
      },
    });
  }

  async createUser(data: Prisma.UserCreateManyInput) {
    return this.prisma.user.create({ data });
  }

  async updateUser(user: User): Promise<User> {
    if (user.password) {
      user.password = await Hashing.hashKey(user.password);
    }

    const { id, ...data } = user;

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
