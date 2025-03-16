import { $Enums } from '@prisma/client';
import { z } from 'zod';
import { AddressCreateSchema } from '../../../address/domain/schemas/address-create.schema';

export const OrganizationCreateSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Nome inválido!',
    }),
    tradeName: z.string({
      message: 'Nome fantasia inválido!',
    }),
    email: z
      .string({
        message: 'E-mail inválido!',
      })
      .email({ message: 'Formato de e-mail inválido!' }),
    status: z.nativeEnum($Enums.Status, {
      message: 'Status inválido!',
    }),
    address: AddressCreateSchema,
  }),
});
