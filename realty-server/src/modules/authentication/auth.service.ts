/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { Hash } from 'crypto';
import Hashing from 'src/common/utils/hashing';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<Users, 'password'> | null> {
    const user = await this.usersService.user({ email });

    if (!user) return null;

    const passwordValid = await Hashing.compareKeyWithHash(
      password,
      user.password,
    );

    if (passwordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: Users) {
    const { id, ...payload } = { ...user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: Users) {
    data.password = await Hashing.hashKey(data.password);
    const { password, ...result } = await this.usersService.createUser(data);
    return result;
  }
}
