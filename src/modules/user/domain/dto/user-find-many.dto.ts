import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationRequestDto } from 'src/shared/domain/dto/pagination-request.dto';

export class UserFindManyDto extends PaginationRequestDto {
  @IsString({ message: 'Pesquisa inválido!' })
  @IsOptional()
  search?: string;

  @IsString({ message: 'Name inválido!' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'E-mail inválido!' })
  @IsOptional()
  email?: string;

  @IsEnum($Enums.Gender, { message: 'Gênero inválido!' })
  @IsOptional()
  gender?: $Enums.Gender;

  @IsNumber({}, { message: 'Perfil inválido!' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  roleId?: number;

  @IsEnum($Enums.RoleReferences, { message: 'Referência inválida!' })
  @IsOptional()
  roleReference?: $Enums.RoleReferences;

  @IsNumber({}, { message: 'Organização inválida!' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  organizationId?: number;

  @IsNumber({}, { message: 'Empresa inválida!' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  companyId?: number;

  @IsArray()
  @IsEnum($Enums.Status, { message: 'Status inválido!', each: true })
  @IsOptional()
  status?: $Enums.Status[];

  @IsBoolean({ message: 'Incluir deletados inválido!' })
  @IsDefined()
  @Transform(({ value }) => value == 'true')
  includeDeleted?: boolean = false;
}
