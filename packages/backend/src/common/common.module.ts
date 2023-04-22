import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma.service';
import { StorageService } from './providers/storage/storage.service';
@Module({
  providers: [PrismaService, StorageService],
  exports: [PrismaService, StorageService],
})
export class CommonModule {}
