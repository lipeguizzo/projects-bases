import { EStatus } from '@/shared/domain/enums/status.enum';
import { CompanyEntity } from '../../../company/domain/entities/company.entity';
import { ERoleReference } from '../enums/role-reference.enum';
import { OrganizationEntity } from '@/modules/organization/domain/entities/organization.entity';

export class RoleEntity {
  id: number = 0;
  name: string = '';
  isDefault: boolean = false;
  status: EStatus = EStatus.ACTIVE;
  reference: ERoleReference = ERoleReference.CLIENT;
  organizationId?: number = 0;
  organization?: OrganizationEntity;
  companyId?: number = 0;
  company?: CompanyEntity;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  deletedAt?: Date = new Date();

  constructor(partial: Partial<RoleEntity>) {
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
