import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: Users }) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() user: Users) {
    return this.authService.register(user);
  }
}
