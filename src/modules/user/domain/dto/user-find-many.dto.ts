import { $Enums } from '@prisma/client';
import { PaginationRequestDto } from '../../../../shared/domain/dto/pagination-request.dto';

export class UserFindManyDto extends PaginationRequestDto {
  search?: string;
  name?: string;
  email?: string;
  gender?: $Enums.Gender;
  roleId?: number;
  roleReference?: $Enums.RoleReferences;
  organizationId?: number;
  companyId?: number;
  status?: $Enums.Status[];
  includeDeleted?: boolean = false;

  constructor(partial: UserFindManyDto) {
    super();
    Object.assign(this, {
      ...partial,
    });
  }
}
