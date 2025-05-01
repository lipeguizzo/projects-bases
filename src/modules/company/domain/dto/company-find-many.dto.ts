import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { EStatus } from '@/shared/domain/enums/status.enum';

export interface CompanyFindManyDto extends IPaginationRequest {
  search?: string;
  name?: string;
  tradeName?: string;
  email?: string;
  status?: EStatus[];
  organizationId?: number;
  state?: string;
  city?: string;
  street?: string;
  neighborhood?: string;
  includeDeleted?: boolean;
}
