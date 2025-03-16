import { $Enums } from '@prisma/client';
import { PaginationRequestDto } from '../../../../shared/domain/dto/pagination-request.dto';

export class RoleFindManyDto extends PaginationRequestDto {
  search?: string;
  name?: string;
  isDefault?: boolean = false;
  reference?: $Enums.RoleReferences;
  status?: $Enums.Status[];
  includeDeleted?: boolean = false;

  constructor(partial: RoleFindManyDto) {
    super();
    Object.assign(this, {
      ...partial,
    });
  }
}
