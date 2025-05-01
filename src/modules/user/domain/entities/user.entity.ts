import { EStatus } from '@/shared/domain/enums/status.enum';
import { EGender } from '../enums/gender.enum';
import { CompanyEntity } from '@/modules/company/domain/entities/company.entity';
import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import { StoredFileEntity } from '@/shared/domain/entities/stored-file.entity';
import { OrganizationEntity } from '@/modules/organization/domain/entities/organization.entity';

export class UserEntity {
  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  gender: EGender = EGender.M;
  phone: string = '';
  status: EStatus = EStatus.ACTIVE;
  organizationId?: number = 0;
  organization?: OrganizationEntity;
  companyId?: number = 0;
  company?: CompanyEntity;
  roleId: number = 0;
  role?: RoleEntity;
  avatarId?: number = 0;
  avatar?: StoredFileEntity;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date = new Date();

  constructor(partial: Partial<UserEntity>) {
    const organization =
      partial.organization && new OrganizationEntity(partial.organization);
    const company = partial.company && new CompanyEntity(partial.company);
    const role = partial.role && new RoleEntity(partial.role);
    const avatar = partial.avatar && new StoredFileEntity(partial.avatar);
    Object.assign(this, {
      organization,
      company,
      role,
      avatar,
      ...partial,
    });
  }
}
