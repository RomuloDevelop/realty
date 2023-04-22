import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../../common/strategies/local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../common/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
