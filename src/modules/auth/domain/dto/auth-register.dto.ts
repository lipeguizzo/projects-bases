import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { AddressRegisterDto } from '@/shared/domain/dto/address-register.dto';

export interface AuthRegisterDto {
  name: string;
  email: string;
  gender: EGender;
  phone: string;
  reference: ERoleReference;
  password: string;
  organizationName?: string;
  organizationTradeName?: string;
  organizationEmail?: string;
  address?: AddressRegisterDto;
}
