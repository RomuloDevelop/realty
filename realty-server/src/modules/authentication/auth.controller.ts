import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register')
  async register(@Body() user: User) {
    return this.authService.register(user);
  }

  @Public()
  @Put('updateAccount')
  async updateAccount(@Body() user: User & { actualPassword: string }) {
    return this.authService.updateAccount(user);
  }
}
