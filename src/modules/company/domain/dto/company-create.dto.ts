import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressCreateDto } from 'src/modules/address/domain/dto/address-create.dto';

export class CompanyCreateDto {
  @IsString({ message: 'Nome inválido!' })
  name: string;

  @IsString({ message: 'Nome fantasia inválido!' })
  tradeName: string;

  @IsEmail({}, { message: 'E-mail inválido!' })
  email: string;

  @IsNumber({}, { message: 'Organização inválida!' })
  organizationId?: number;

  @IsEnum($Enums.Status, { message: 'Status inválido!' })
  status: $Enums.Status;

  @ValidateNested()
  @Type(() => AddressCreateDto)
  address: AddressCreateDto;
}
