import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  createProvinces(data: Prisma.ProvincesCreateManyInput[]) {
    return this.prisma.provinces.createMany({ data });
  }

  createCounties(data: Prisma.CountiesCreateManyInput[]) {
    return this.prisma.counties.createMany({ data });
  }

  createCities(data: Prisma.CitiesCreateManyInput[]) {
    return this.prisma.cities.createMany({ data });
  }

  createNeighbourhoods(data: Prisma.NeighbourhoodsCreateManyInput[]) {
    return this.prisma.neighbourhoods.createMany({ data });
  }
}
