import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    CommonModule,
    ModulesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
