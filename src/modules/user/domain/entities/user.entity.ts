import { $Enums } from '@prisma/client';
import { CompanyEntity } from 'src/modules/company/domain/entities/company.entity';
import { OrganizationEntity } from 'src/modules/organization/domain/entities/organization.entity';
import { RoleEntity } from 'src/modules/role/domain/entities/role.entity';
import { StoredFileEntity } from 'src/modules/stored-file/domain/entities/stored-file.entity';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: $Enums.Gender;
  phone: string;
  status: $Enums.Status;
  organizationId?: number;
  organization?: OrganizationEntity;
  companyId?: number;
  company?: CompanyEntity;
  roleId: number;
  role?: RoleEntity;
  avatarId?: number;
  avatar?: StoredFileEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

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
