import { $Enums } from '@prisma/client';
import { OrganizationEntity } from '../../../organization/domain/entities/organization.entity';
import { AddressEntity } from '../../../address/domain/entities/address.entity';
import { StoredFileEntity } from '../../../stored-file/domain/entities/stored-file.entity';

export class CompanyEntity {
  id: number;
  name: string;
  tradeName?: string | null;
  email: string;
  organizationId: number;
  organization?: OrganizationEntity | null;
  status: $Enums.Status;
  addressId: number;
  address?: AddressEntity | null;
  avatarId?: number | null;
  avatar?: StoredFileEntity | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(partial: CompanyEntity) {
    const organization =
      partial.organization && new OrganizationEntity(partial.organization);
    const address = partial.address && new AddressEntity(partial.address);
    const avatar = partial.avatar && new StoredFileEntity(partial.avatar);
    Object.assign(this, {
      organization,
      address,
      avatar,
      ...partial,
    });
  }
}
