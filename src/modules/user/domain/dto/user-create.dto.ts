import { EStatus } from '@/shared/domain/enums/status.enum';
import { EGender } from '../enums/gender.enum';

export interface UserCreateDto {
  name: string;
  email: string;
  password: string;
  gender: EGender;
  phone: string;
  status: EStatus;
  roleId: number;
  organizationId?: number;
  companyId?: number;
}
