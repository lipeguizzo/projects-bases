import { AddressUpdateDto } from '@/shared/domain/dto/address-update.dto';
import { EStatus } from '@/shared/domain/enums/status.enum';

export interface OrganizationUpdateDto {
  name: string;
  tradeName: string;
  email: string;
  status: EStatus;
  address: AddressUpdateDto;
  avatarId?: number;
}
