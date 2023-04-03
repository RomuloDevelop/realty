import { Injectable } from '@nestjs/common';
import { Properties, PropertyTypes } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { Paginator } from 'types/paginator';
import { StorageService } from 'src/common/providers/storage/storage.service';
import { CreateProperty, SearchProperty } from './properties.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService, private storage: StorageService) {}

  async searchProperties(params: SearchProperty) {
    const { skip, take, text } = params;
    console.log(params);
    return this.prisma.$queryRaw`
      SELECT pt.description, pt.description, pv.name, cn.name, ct.name, nh.name
      FROM "Properties" pt
      INNER JOIN "Provinces" pv ON pv.id = pt."provinceId"
      INNER JOIN "Counties" cn ON cn.id = pt."countyId"
      INNER JOIN "Cities" ct ON ct.id = pt."cityId"
      INNER JOIN "Neighbourhoods" nh ON nh.id = pt."neighbourhoodId"
      WHERE to_tsvector(
        pt.description || ' ' ||
        pv.name || ' ' ||
        cn.name || ' ' ||
        ct.name || ' ' ||
        nh.name
      ) @@ to_tsquery(${text})
      LIMIT ${parseInt(take)}
      OFFSET ${parseInt(skip)}
    `;
  }

  async properties(params: Paginator) {
    const { skip, take, cursor, orderBy, where } = params;
    return this.prisma.properties.findMany({
      skip,
      take,
      cursor,
      orderBy,
      where,
    });
  }

  async createProperty(
    {
      agentId,
      countyId,
      provinceId,
      neighbourhoodId,
      cityId,
      propertyType,
      ...data
    }: CreateProperty,
    files: { filename: string; buffer: Buffer }[],
  ) {
    const property = await this.prisma.properties.create({
      data: {
        ...data,
        type: {
          connect: { id: propertyType },
        },
        agent: {
          connect: { id: agentId },
        },
        county: {
          connect: { id: countyId },
        },
        province: {
          connect: { id: provinceId },
        },
        city: {
          connect: { id: cityId },
        },
        neighbourhood: {
          connect: { id: neighbourhoodId },
        },
      },
    });

    const images = files.map((image) => {
      const url = this.storage.save(
        `properties/${property.id}/${image.filename}`,
        image.buffer,
        [
          {
            meta: 'meta',
          },
        ],
      );

      return { url, name: image.filename, propertyId: property.id };
    });

    const propertyImages = await this.prisma.propertyImages.createMany({
      data: images,
    });

    return { ...property, propertyImages };
  }

  async updateProperty(data: Properties) {
    return this.prisma.properties.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async createProperties(data: Properties[]) {
    return this.prisma.properties.createMany({ data });
  }

  async createPropertyType(data: PropertyTypes) {
    return this.prisma.propertyTypes.create({ data });
  }

  async updatePropertyType(data: PropertyTypes) {
    return this.prisma.propertyTypes.update({
      data,
      where: {
        id: data.id,
      },
    });
  }
}
