import { Users } from '@prisma/client';

export type JwtPayload = Omit<Users, 'id' | 'password'> & { sub: number };

interface Paginator {
  page: string;
  perPage: string;
  orderBy?: string;
}
