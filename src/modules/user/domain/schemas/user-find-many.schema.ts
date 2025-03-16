import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const UserFindManySchema = z.object({
  query: z.object({
    search: z.string({ message: 'Pesquisa inválida!' }).optional(),
    name: z.string({ message: 'Nome inválido!' }).optional(),
    email: z.string({ message: 'E-mail inválido!' }).optional(),
    gender: z
      .nativeEnum($Enums.Gender, {
        message: 'Gênero inválido!',
      })
      .optional(),
    roleId: z.coerce.number({ message: 'Perfil inválido!' }).optional(),
    roleReference: z
      .nativeEnum($Enums.RoleReferences, {
        message: 'Referência inválida!',
      })
      .optional(),
    organizationId: z.coerce
      .number({ message: 'Organização inválida!' })
      .optional(),
    companyId: z.coerce.number({ message: 'Empresa inválida!' }).optional(),
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
