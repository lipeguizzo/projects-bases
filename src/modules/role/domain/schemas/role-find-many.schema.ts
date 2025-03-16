import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const RoleFindManySchema = z.object({
  query: z.object({
    search: z.string({ message: 'Pesquisa inválida!' }).optional(),
    name: z.string({ message: 'Nome inválido!' }).optional(),
    isDefault: z.coerce.boolean({ message: 'Padrão inválido!' }).optional(),
    reference: z
      .nativeEnum($Enums.RoleReferences, {
        message: 'Referência inválido!',
      })
      .optional(),
    status: z
      .union([
        z.nativeEnum($Enums.Status, {
          message: 'Status inválido!',
        }),
        z.string({ message: 'Status inválido' }),
      ])
      .optional(),
    includeDeleted: z.coerce
      .boolean({ message: 'Incluir deletados inválido!' })
      .optional(),
  }),
});
