import { $Enums } from '@prisma/client';
import { PaginationRequestDto } from '../../../../shared/domain/dto/pagination-request.dto';

export class CompanyFindManyDto extends PaginationRequestDto {
  search?: string;
  name?: string;
  tradeName?: string;
  email?: string;
  organizationId?: number;
  status?: $Enums.Status[];
  state?: string;
  city?: string;
  street?: string;
  neighborhood?: string;
  includeDeleted?: boolean = false;

  constructor(partial: CompanyFindManyDto) {
    super();
    Object.assign(this, {
      ...partial,
    });
  }
}
