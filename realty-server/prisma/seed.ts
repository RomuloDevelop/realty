/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';
import { pick } from 'lodash';
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
    prisma.provinces.createMany({ data: provinces }),
    prisma.counties.createMany({ data: counties }),
    prisma.cities.createMany({ data: cities }),
    prisma.neighbourhoods.createMany({ data: neighbourhoods }),
    prisma.userRoles.createMany({ data: roles }),
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
