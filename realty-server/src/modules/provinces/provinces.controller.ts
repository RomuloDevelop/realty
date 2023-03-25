import { Body, Controller, Get } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class CountryController {
  constructor(private provincesService: ProvincesService) {}

  @Get()
  async provinces(@Body() body: { data: Prisma.ProvincesCreateManyInput[] }) {
    this.provincesService.createProvinces(body.data);
  }

  @Get('/counties')
  async counties(@Body() body: { data: Prisma.CountiesCreateManyInput[] }) {
    this.provincesService.createCounties(body.data);
  }

  @Get('/cities')
  async cities(@Body() body: { data: Prisma.CitiesCreateManyInput[] }) {
    this.provincesService.createCities(body.data);
  }

  @Get('/neighbourhoods')
  async neighbourhoods(
    @Body() body: { data: Prisma.NeighbourhoodsCreateManyInput[] },
  ) {
    this.provincesService.createNeighbourhoods(body.data);
  }
}
