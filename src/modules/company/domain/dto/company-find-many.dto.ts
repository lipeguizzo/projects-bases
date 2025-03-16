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

export class CompanyFindManyDto extends PaginationRequestDto {
  @IsString({ message: 'Pesquisa inválida!' })
  @IsOptional()
  search?: string;

  @IsString({ message: 'Nome inválido!' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Nome fantasia inválido!' })
  @IsOptional()
  tradeName?: string;

  @IsString({ message: 'E-mail inválido!' })
  @IsOptional()
  email?: string;

  @IsNumber({}, { message: 'Organização inválida!' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  organizationId?: number;

  @IsArray()
  @IsEnum($Enums.Status, { message: 'Status inválido!', each: true })
  @IsOptional()
  status?: $Enums.Status[];

  @IsString({ message: 'Estado inválido!' })
  @IsOptional()
  state?: string;

  @IsString({ message: 'Cidade inválida!' })
  @IsOptional()
  city?: string;

  @IsString({ message: 'Logradouro inválido!' })
  @IsOptional()
  street?: string;

  @IsString({ message: 'Bairro inválido!' })
  @IsOptional()
  neighborhood?: string;

  @IsBoolean({ message: 'Incluir deletados inválido!' })
  @IsDefined()
  @Transform(({ value }) => value == 'true')
  includeDeleted?: boolean = false;
}
