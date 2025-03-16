import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationRequestDto } from 'src/shared/domain/dto/pagination-request.dto';

export class RoleFindManyDto extends PaginationRequestDto {
  @IsString({ message: 'Pesquisa inválida!' })
  @IsOptional()
  search?: string;

  @IsString({ message: 'Nome inválido!' })
  @IsOptional()
  name?: string;

  @IsBoolean({ message: 'Valor padrão inválido!' })
  @IsDefined()
  @Transform(({ value }) => value == 'true')
  isDefault?: boolean = false;

  @IsEnum($Enums.RoleReferences, { message: 'Referência inválida!' })
  @IsOptional()
  reference?: $Enums.RoleReferences;

  @IsArray()
  @IsEnum($Enums.Status, { message: 'Status inválido!', each: true })
  @IsOptional()
  status?: $Enums.Status[];

  @IsBoolean({ message: 'Incluir deletados inválido!' })
  @IsDefined()
  @Transform(({ value }) => value == 'true')
  includeDeleted?: boolean = false;
}
