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

  async myAccount(id: number) {
    return this.usersService.user({ id });
  }

  async login(user: User) {
    const { id, ...payload } = { ...user, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(data: User) {
    data.roleId = Role.Client;
    data.password = await Hashing.hashKey(data.password);
    const { password, ...result } = await this.usersService.createUser(data);
    return result;
  }

  async updateAccount(data: User & { actualPassword: string }) {
    if (data.password) {
      const user = await this.usersService.user({
        id: data.id,
      });
      console.log(user, data.actualPassword);
      const hashedPassword = await Hashing.hashKey(data.actualPassword);
      const passwordValid = await Hashing.compareKeyWithHash(
        user.password,
        hashedPassword,
      );

      if (!passwordValid) throw new UnauthorizedException();
    }

    const { password, ...result } = await this.usersService.updateUser(data);
    return result;
  }
}
