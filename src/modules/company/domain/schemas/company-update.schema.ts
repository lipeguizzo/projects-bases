import { $Enums } from '@prisma/client';
import { z } from 'zod';
import { AddressUpdateSchema } from '../../../address/domain/schemas/address-update.schema';

export const CompanyUpdateSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
  body: z.object({
    name: z
      .string({
        message: 'Nome inválido!',
      })
      .optional(),
    tradeName: z
      .string({
        message: 'Nome fantasia inválido!',
      })
      .optional(),
    email: z
      .string({
        message: 'E-mail inválido!',
      })
      .email({ message: 'Formato de e-mail inválido!' })
      .optional(),
    organizationId: z.coerce
      .number({ message: 'Organização inválida!' })
      .optional(),
    status: z
      .nativeEnum($Enums.Status, {
        message: 'Status inválido!',
      })
      .optional(),
    address: AddressUpdateSchema,
  }),
});
