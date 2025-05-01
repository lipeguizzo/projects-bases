import { EStatus } from '@/shared/domain/enums/status.enum';
import { AddressUpdateSchema } from '@/shared/domain/schemas/address-update.schema';
import { z } from 'zod';

export const OrganizationUpdateSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório!').trim(),
  tradeName: z.string().min(1, 'Campo obrigatório!').trim(),
  email: z
    .string()
    .min(1, 'Campo obrigatório!')
    .email({ message: 'E-mail inválido!' })
    .trim(),
  status: z.nativeEnum(EStatus, { message: 'Campo obrigatório!' }),
  avatar: z.instanceof(File).optional().nullable(),
  address: AddressUpdateSchema,
});

export type OrganizationUpdateData = z.infer<typeof OrganizationUpdateSchema>;
