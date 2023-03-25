import { Body, Controller, Post } from '@nestjs/common';
import { Properties } from '@prisma/client';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Post()
  properties(@Body() body: Properties) {
    this.propertiesService.createProperty(body);
  }
}
