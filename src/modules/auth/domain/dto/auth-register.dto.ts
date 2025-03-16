import { $Enums } from '@prisma/client';
import { AddressCreateDto } from '../../../address/domain/dto/address-create.dto';

export class AuthRegisterDto {
  name: string;
  email: string;
  password: string;
  gender: $Enums.Gender;
  phone: string;
  reference: $Enums.RoleReferences;
  organizationName?: string;
  organizationTradeName?: string;
  organizationEmail?: string;
  address?: AddressCreateDto;
}
