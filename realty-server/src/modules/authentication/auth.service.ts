/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import Hashing from 'src/common/utils/hashing';
import { Role } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
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

  async login(user: User) {
    const { id, ...payload } = { ...user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: User) {
    data.roleId = Role.Client;
    data.password = await Hashing.hashKey(data.password);
    const { password, ...result } = await this.usersService.createUser(data);
    return result;
  }

  async updateAccount(data: User & { actualPassword: string }) {
    const { password: passwordFromDb } = await this.usersService.user({
      email: data.email,
    });
    const passwordValid = await Hashing.compareKeyWithHash(
      passwordFromDb,
      data.actualPassword,
    );

    if (passwordValid) data.password = await Hashing.hashKey(data.password);
    else throw new UnauthorizedException();

    const { password, ...result } = await this.usersService.updateUser(data);
    return result;
  }
}
