import { $Enums } from '@prisma/client';
import { PaginationRequestDto } from '../../../../shared/domain/dto/pagination-request.dto';

export class OrganizationFindManyDto extends PaginationRequestDto {
  search?: string;
  name?: string;
  tradeName?: string;
  email?: string;
  status?: $Enums.Status[];
  state?: string;
  city?: string;
  street?: string;
  neighborhood?: string;
  includeDeleted?: boolean = false;

  constructor(partial: OrganizationFindManyDto) {
    super();
    Object.assign(this, {
      ...partial,
    });
  }
}
