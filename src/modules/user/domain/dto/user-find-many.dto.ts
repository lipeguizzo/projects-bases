import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';

export interface UserFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  email?: string;
  gender?: EGender;
  roleId?: number;
  roleReference?: ERoleReference;
  organizationId?: number;
  companyId?: number;
  status?: EStatus[];
  includeDeleted?: boolean;
}
