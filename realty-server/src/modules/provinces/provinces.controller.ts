import { Controller, Get, Query } from '@nestjs/common';
import { ProvincesService } from './provinces.service';

@Controller('provinces')
export class CountryController {
  constructor(private provincesService: ProvincesService) {}

  @Get()
  async provinces() {
    return this.provincesService.provinces();
  }

  @Get('/counties')
  async counties(@Query() query: { name: string; abbreviation: string }) {
    return this.provincesService.counties(query);
  }

  @Get('/cities')
  async cities(@Query() query: { name: string; countyFips: string }) {
    return this.provincesService.cities(query);
  }

  @Get('/neighbourhoods')
  async neighbourhoods(@Query() query: { name: string; cityId: string }) {
    return this.provincesService.neighbourhoods(query);
  }
}
