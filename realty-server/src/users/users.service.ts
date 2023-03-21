import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { Paginator } from '../../types/paginator';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(uniqueInput: Prisma.UsersWhereUniqueInput) {
    return this.prisma.users.findUnique({
      where: uniqueInput,
    });
  }

  async users(params: Paginator) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async usersByRole(roleId: number) {
    return this.prisma.users.findMany({
      where: {
        roleId,
      },
    });
  }

  async createUser(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const { where, data } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UsersWhereUniqueInput): Promise<Users> {
    return this.prisma.users.delete({
      where,
    });
  }
}
