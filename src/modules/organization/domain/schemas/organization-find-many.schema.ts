import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const OrganizationFindManySchema = z.object({
  query: z.object({
    search: z.string({ message: 'Pesquisa inválida!' }).optional(),
    name: z.string({ message: 'Nome inválido!' }).optional(),
    tradeName: z.string({ message: 'Nome fantasia inválido!' }).optional(),
    email: z.string({ message: 'E-mail inválido!' }).email().optional(),
    status: z
      .union([
        z.nativeEnum($Enums.Status, {
          message: 'Status inválido!',
        }),
        z.string({ message: 'Status inválido' }),
      ])
      .optional(),
    state: z
      .string({
        message: 'Estado inválido!',
      })
      .optional(),
    city: z
      .string({
        message: 'Cidade inválido!',
      })
      .optional(),
    street: z
      .string({
        message: 'Logradouro inválido!',
      })
      .optional(),
    neighborhood: z
      .string({
        message: 'Bairro inválido!',
      })
      .optional(),
    includeDeleted: z.coerce
      .boolean({ message: 'Incluir deletados inválido!' })
      .optional(),
  }),
});
