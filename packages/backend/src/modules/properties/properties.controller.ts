import {
  Body,
  Controller,
  Get,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Property, PropertyType } from '@prisma/client';
import { Role } from 'src/common/constants';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Paginator } from 'types';
import { SearchProperty } from './properties.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  properties(@Query() req: Paginator) {
    return this.propertiesService.properties(req);
  }

  @Post()
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('images', 5))
  createProperty(
    @Body() body: Property,
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
      if (
        item !== 'title' &&
        item !== 'provinceAbbreviation' &&
        item !== 'countyFipscode' &&
        item !== 'address' &&
        item !== 'description'
      ) {
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
      formattedBody as Property,
      imagesData,
    );
  }

  @Put()
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('images', 5))
  updateProperty(
    @Body() body: Property,
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
      if (
        item !== 'title' &&
        item !== 'provinceAbbreviation' &&
        item !== 'countyFipscode' &&
        item !== 'address' &&
        item !== 'description'
      ) {
        formattedBody[item] = parseFloat(body[item]);
        return;
      }
      formattedBody[item] = body[item];
    });

    const imagesData = images.map((item) => ({
      filename: item.originalname,
      buffer: item.buffer,
    }));

    return this.propertiesService.updateProperty(
      formattedBody as Property,
      imagesData,
    );
  }

  @Get('/search')
  searchProperty(@Query() query: SearchProperty) {
    return this.propertiesService.searchProperties(query);
  }

  @Get('/types')
  propertyTypes() {
    return this.propertiesService.types();
  }

  @Get('/categories')
  propertyCategories() {
    return this.propertiesService.categories();
  }
}
