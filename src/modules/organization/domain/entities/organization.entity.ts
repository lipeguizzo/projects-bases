import { $Enums } from '@prisma/client';
import { AddressEntity } from '../../../address/domain/entities/address.entity';
import { StoredFileEntity } from '../../../stored-file/domain/entities/stored-file.entity';

export class OrganizationEntity {
  id: number;
  name: string;
  tradeName?: string | null;
  email: string;
  status: $Enums.Status;
  addressId: number;
  address?: AddressEntity | null;
  avatarId?: number | null;
  avatar?: StoredFileEntity | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(partial: OrganizationEntity) {
    const address = partial.address && new AddressEntity(partial.address);
    const avatar = partial.avatar && new StoredFileEntity(partial.avatar);
    Object.assign(this, {
      address,
      avatar,
      ...partial,
    });
  }
}
