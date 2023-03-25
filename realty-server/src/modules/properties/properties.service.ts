import { Injectable } from '@nestjs/common';
import { Properties } from '@prisma/client';
import { PrismaService } from '../../common/database/prisma.service';
import { Paginator } from 'types/paginator';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async properties(params: Paginator) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.properties.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        agent: true,
      },
    });
  }

  async createProperty(data: Properties) {
    return this.prisma.properties.create({ data });
  }

  async createProperties(data: Properties[]) {
    return this.prisma.properties.createMany({ data });
  }
}
