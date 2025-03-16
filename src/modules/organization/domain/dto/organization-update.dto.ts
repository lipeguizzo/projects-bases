import { $Enums } from '@prisma/client';
import { AddressUpdateDto } from '../../../address/domain/dto/address-update.dto';

export class OrganizationUpdateDto {
  name?: string;
  tradeName?: string;
  email?: string;
  status?: $Enums.Status;
  address?: AddressUpdateDto;
}
