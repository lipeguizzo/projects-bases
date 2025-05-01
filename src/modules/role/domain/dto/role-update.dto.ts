import { EStatus } from '@/shared/domain/enums/status.enum';
import { ERoleReference } from '../enums/role-reference.enum';

export interface RoleUpdateDto {
  name: string;
  reference: ERoleReference;
  status: EStatus;
  abilitiesIds: number[];
}
