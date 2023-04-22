import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { ProvincesModule } from './provinces/provinces.module';

@Module({
  imports: [UsersModule, AuthModule, PropertiesModule, ProvincesModule],
  exports: [UsersModule, AuthModule, PropertiesModule],
})
export class ModulesModule {}
