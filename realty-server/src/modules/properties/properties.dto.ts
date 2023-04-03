import { Properties } from '@prisma/client';

export type CreateProperty = Omit<Properties, 'id'>;
export interface SearchProperty {
  skip: string;
  take: string;
  text: string;
}
