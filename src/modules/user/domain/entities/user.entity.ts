import { $Enums } from '@prisma/client';
import { OrganizationEntity } from '../../../organization/domain/entities/organization.entity';
import { StoredFileEntity } from '../../../stored-file/domain/entities/stored-file.entity';
import { RoleEntity } from '../../../role/domain/entities/role.entity';
import { CompanyEntity } from '../../../company/domain/entities/company.entity';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: $Enums.Gender;
  phone: string;
  status: $Enums.Status;
  organizationId?: number | null;
  organization?: OrganizationEntity | null;
  companyId?: number | null;
  company?: CompanyEntity | null;
  roleId: number;
  role?: RoleEntity | null;
  avatarId?: number | null;
  avatar?: StoredFileEntity | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(partial: UserEntity) {
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
