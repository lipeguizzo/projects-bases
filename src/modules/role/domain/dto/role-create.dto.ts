import { $Enums } from '@prisma/client';

export class RoleCreateDto {
  name: string;
  isDefault: boolean = false;
  reference: $Enums.RoleReferences;
  organizationId?: number;
  companyId?: number;
  status: $Enums.Status;
  abilitiesIds: number[];
}
