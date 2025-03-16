import { $Enums } from '@prisma/client';
import { AddressUpdateDto } from '../../../address/domain/dto/address-update.dto';

export class CompanyUpdateDto {
  name?: string;
  tradeName?: string;
  email?: string;
  organizationId?: number;
  status?: $Enums.Status;
  address?: AddressUpdateDto;
}
