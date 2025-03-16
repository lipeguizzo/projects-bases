import { $Enums } from '@prisma/client';
import { AddressCreateDto } from '../../../address/domain/dto/address-create.dto';

export class CompanyCreateDto {
  name: string;
  tradeName: string;
  email: string;
  organizationId: number;
  status: $Enums.Status;
  address: AddressCreateDto;
}
