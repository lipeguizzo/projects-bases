import { PartialType } from '@nestjs/swagger';
import { OrganizationCreateDto } from './organization-create.dto';

export class OrganizationUpdateDto extends PartialType(OrganizationCreateDto) {}
