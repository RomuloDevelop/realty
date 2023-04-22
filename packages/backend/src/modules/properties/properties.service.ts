import { Injectable } from '@nestjs/common';
import { Property, PropertyType } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma.service';
import { StorageService } from 'src/common/providers/storage/storage.service';
import { Paginator } from 'types';
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
    const { page, perPage } = params;
    const pageNum = parseInt(page);
    const perPageNum = parseInt(perPage);

    return this.prisma.property.findMany({
      skip: pageNum * perPageNum,
      take: perPageNum,
      include: {
        propertyImages: true,
      },
    });
  }

  async createProperty(
    data: CreateProperty,
    files: { filename: string; buffer: Buffer }[],
  ) {
    if (!data.neighbourhoodId) delete data.neighbourhoodId;

    const property = await this.prisma.property.create({ data });

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

    const propertyImages = await this.prisma.propertyImage.createMany({
      data: images,
    });

    return { ...property, propertyImages };
  }

  async types() {
    return this.prisma.propertyType.findMany();
  }

  async categories() {
    return this.prisma.propertyCategory.findMany();
  }

  async updateProperty(
    data: Property,
    files: { filename: string; buffer: Buffer }[],
  ) {
    if (!data.neighbourhoodId) delete data.neighbourhoodId;

    const property = await this.prisma.property.update({
      data,
      where: {
        id: data.id,
      },
    });

    const images = files.map((image) => {
      const url = this.storage.save(
        `properties/${data.id}/${image.filename}`,
        image.buffer,
        [
          {
            meta: 'meta',
          },
        ],
      );

      return { url, name: image.filename, propertyId: data.id };
    });

    await this.prisma.propertyImage.deleteMany({
      where: {
        propertyId: data.id,
      },
    });

    const propertyImages = await this.prisma.propertyImage.createMany({
      data: images,
    });

    return { ...property, propertyImages };
  }

  async createProperties(data: Property[]) {
    return this.prisma.property.createMany({ data });
  }

  async createPropertyType(data: PropertyType) {
    return this.prisma.propertyType.create({ data });
  }

  async updatePropertyType(data: PropertyType) {
    return this.prisma.propertyType.update({
      data,
      where: {
        id: data.id,
      },
    });
  }
}
