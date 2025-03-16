import { $Enums } from '@prisma/client';

export class RoleUpdateDto {
  name?: string;
  isDefault?: boolean = false;
  reference?: $Enums.RoleReferences;
  organizationId?: number;
  companyId?: number;
  status: $Enums.Status;
  abilitiesIds: number[];
}
