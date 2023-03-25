import { Module } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CountryController } from './provinces.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [ProvincesService],
  controllers: [CountryController],
})
export class ProvincesModule {}
