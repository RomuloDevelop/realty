import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
