import { $Enums } from '@prisma/client';
import { AddressCreateDto } from '../../../address/domain/dto/address-create.dto';

export class OrganizationCreateDto {
  name: string;
  tradeName?: string;
  email: string;
  status: $Enums.Status;
  address: AddressCreateDto;
}
