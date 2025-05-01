import { EStatus } from '@/shared/domain/enums/status.enum';
import { ERoleReference } from '../enums/role-reference.enum';

export interface RoleCreateDto {
  name: string;
  reference: ERoleReference;
  organizationId?: number;
  companyId?: number;
  status: EStatus;
  abilitiesIds: number[];
}
