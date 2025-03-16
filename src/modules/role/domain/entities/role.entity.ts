import { $Enums } from '@prisma/client';
import { CompanyEntity } from '../../../company/domain/entities/company.entity';
import { OrganizationEntity } from 'src/modules/organization/domain/entities/organization.entity';

export class RoleEntity {
  id: number;
  name: string;
  isDefault: boolean;
  status: $Enums.Status;
  reference: $Enums.RoleReferences;
  organizationId?: number;
  organization?: OrganizationEntity;
  companyId?: number;
  company?: CompanyEntity;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  constructor(partial: RoleEntity) {
    const organization =
      partial.organization && new OrganizationEntity(partial.organization);
    const company = partial.company && new CompanyEntity(partial.company);
    Object.assign(this, {
      organization,
      company,
      ...partial,
    });
  }
}
