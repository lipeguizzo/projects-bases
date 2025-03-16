import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const RoleCreateSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Nome inválido!',
    }),
    reference: z.nativeEnum($Enums.RoleReferences, {
      message: 'Referência inválido!',
    }),
    isDefault: z.boolean({
      message: 'Valor padrão inválido!',
    }),
    organizationId: z.coerce
      .number({
        message: 'Organização inválida!',
      })
      .optional(),
    companyId: z.coerce
      .number({
        message: 'Empresa inválida!',
      })
      .optional(),
    status: z.nativeEnum($Enums.Status, {
      message: 'Status inválido!',
    }),
    abilitiesIds: z.array(z.number(), { message: 'Habilidades inválida!' }),
  }),
});
