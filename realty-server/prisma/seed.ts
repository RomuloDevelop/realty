/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';
import { pick } from 'lodash';
import Hashing from '../src/common/utils/hashing';
import { Role } from '../src/common/constants';

const prisma = new PrismaClient();

async function main() {
  const provinces = require('../states.json').results;

  const counties = require('../counties.json').results.map((item) => ({
    ...pick(item, ['name', 'stateAbbreviation']),
    fipscode:
      typeof item.fipscode === 'number'
        ? item.fipscode.toString()
        : item.fipscode,
  }));

  const cities = require('../cities.json').results.map((item) => ({
    ...pick(item, ['id', 'name', 'stateAbbreviation']),
    countyFips:
      typeof item.countyFips === 'number'
        ? item.countyFips.toString()
        : item.countyFips,
  }));

  const neighbourhoods = require('../neighbourhoods.json').results.map(
    (item) => ({
      ...pick(item, ['cityId', 'name', 'stateAbbreviation']),
      countyFips:
        typeof item.countyFips === 'number'
          ? item.countyFips.toString()
          : item.countyFips,
    }),
  );

  const roles: { description: string }[] = Object.keys(Role).map((key) => ({
    description: key,
  }));

  await prisma.$transaction([
    prisma.province.createMany({ data: provinces }),
    prisma.county.createMany({ data: counties }),
    prisma.city.createMany({ data: cities }),
    prisma.neighbourhood.createMany({ data: neighbourhoods }),
    prisma.userRole.createMany({ data: roles }),
    prisma.propertyType.createMany({
      data: [
        {
          description: 'Apartamento',
        },
        {
          description: 'Bongalo',
        },
        {
          description: 'Casa',
        },
        {
          description: 'Town Home',
        },
      ],
    }),
    prisma.propertyCategory.createMany({
      data: [
        {
          description: 'Comunidad de apartamentos en Miami',
        },
        {
          description: 'Propiedades para inversión y renta anual',
        },
        {
          description: 'Propiedades para inversión y renta vacacional',
        },
        {
          description: 'Propiedades para vivir o rentar anualmente',
        },
      ],
    }),
    prisma.user.create({
      data: {
        first_name: 'Rómulo',
        email: 'romulocg25@gmail.com',
        password: await Hashing.hashKey('12345678'),
        address: 'Barquisimeto Calle 62 A',
        phone: '+584245765881',
        roleId: 1,
      },
    }),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
