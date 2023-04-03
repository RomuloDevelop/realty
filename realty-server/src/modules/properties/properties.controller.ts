import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Properties, PropertyTypes } from '@prisma/client';
import { Paginator } from 'types/paginator';
import { SearchProperty } from './properties.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  properties(@Req() req: Paginator) {
    return this.propertiesService.properties(req);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 5))
  createProperty(
    @Body() body: Properties,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /jpeg|png|jpg|webp|svg/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 3,
        })
        .build(),
    )
    images: Express.Multer.File[],
  ) {
    const formattedBody = {};

    Object.keys(body).forEach((item) => {
      if (item !== 'address' && item !== 'description') {
        formattedBody[item] = parseFloat(body[item]);
        return;
      }
      formattedBody[item] = body[item];
    });

    const imagesData = images.map((item) => ({
      filename: item.originalname,
      buffer: item.buffer,
    }));

    return this.propertiesService.createProperty(
      formattedBody as Properties,
      imagesData,
    );
  }

  @Put()
  updateProperty(@Body() body: Properties) {
    return this.propertiesService.updateProperty(body);
  }

  @Get('/search')
  searchProperty(@Req() { query }: { query: SearchProperty }) {
    return this.propertiesService.searchProperties(query);
  }

  @Post('/types')
  createPropertyType(@Body() body: PropertyTypes) {
    return this.propertiesService.createPropertyType(body);
  }

  @Put('/types')
  updatePropertyType(@Body() body: PropertyTypes) {
    return this.propertiesService.updatePropertyType(body);
  }
}
