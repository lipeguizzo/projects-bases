import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressCreateDto } from 'src/modules/address/domain/dto/address-create.dto';
import { IsPassword } from 'src/shared/decorators/is-password.decorator';

export class AuthRegisterDto {
  @IsString({ message: 'Nome inválido!' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido!' })
  email: string;

  @IsPassword()
  password: string;

  @IsEnum($Enums.Gender, { message: 'Gênero inválido!' })
  gender: $Enums.Gender;

  @IsString({ message: 'Telefone inválido!' })
  phone: string;

  @IsEnum($Enums.RoleReferences, { message: 'Referência inválida!' })
  reference: $Enums.RoleReferences;

  @IsString({ message: 'Nome da organização inválido!' })
  @IsOptional()
  organizationName?: string;

  @IsString({ message: 'Nome fantasia da organização inválido!' })
  @IsOptional()
  organizationTradeName?: string;

  @IsEmail({}, { message: 'E-mail da organização inválido!' })
  @IsOptional()
  organizationEmail?: string;

  @ValidateNested({ each: true })
  @IsOptional()
  address?: AddressCreateDto;
}
