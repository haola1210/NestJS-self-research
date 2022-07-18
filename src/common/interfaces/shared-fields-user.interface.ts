import { UserRole } from '@prisma/client';

export interface ISharedFieldsUser {
  id: string;
  name: string;
  account: string;
  role: UserRole;
}
