import { Property } from '@prisma/client';

export type CreateProperty = Omit<Property, 'id'>;
export interface SearchProperty {
  skip: string;
  take: string;
  text: string;
}
