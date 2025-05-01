import { z } from 'zod';
import { ERoleReference } from '../enums/role-reference.enum';
import { EStatus } from '@/shared/domain/enums/status.enum';
import { AbilityEntity } from '../entities/ability.entity';

export const RoleCreateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  reference: z.nativeEnum(ERoleReference, { message: 'Campo obrigatório!' }),
  organizationId: z.number().min(1, 'Campo obrigatório!'),
  companyId: z.number().min(1, 'Campo obrigatório!'),
  status: z.nativeEnum(EStatus, { message: 'Campo obrigatório!' }),
  abilities: z.array(z.instanceof(AbilityEntity)),
});

export type RoleCreateData = z.infer<typeof RoleCreateSchema>;
