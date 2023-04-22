import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  provinces() {
    return this.prisma.province.findMany();
  }

  counties(query: { name: string; abbreviation: string }) {
    return this.prisma.county.findMany({
      where: {
        name: {
          contains: query.name,
          mode: 'insensitive',
        },
        stateAbbreviation: query.abbreviation,
      },
    });
  }

  cities(query: { name: string; countyFips: string }) {
    return this.prisma.city.findMany({
      where: {
        name: {
          contains: query.name,
          mode: 'insensitive',
        },
        countyFips: query.countyFips,
      },
    });
  }

  neighbourhoods(query: { name: string; cityId: string }) {
    return this.prisma.neighbourhood.findMany({
      where: {
        name: {
          contains: query.name,
          mode: 'insensitive',
        },
        cityId: parseInt(query.cityId),
      },
    });
  }
}
