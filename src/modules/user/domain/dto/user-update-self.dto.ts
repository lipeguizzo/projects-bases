import { $Enums } from '@prisma/client';

export class UserUpdateSelfDto {
  name?: string;
  email?: string;
  password: string;
  gender?: $Enums.Gender;
  phone?: string;
  status?: $Enums.Status;
  organizationId?: number;
  companyId?: number;
  roleId?: number;
}
