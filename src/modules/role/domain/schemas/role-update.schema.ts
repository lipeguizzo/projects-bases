import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const RoleUpdateSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
  body: z.object({
    name: z
      .string({
        message: 'Nome inválido!',
      })
      .optional(),
    reference: z
      .nativeEnum($Enums.RoleReferences, {
        message: 'Referência inválida!',
      })
      .optional(),
    isDefault: z
      .boolean({
        message: 'Valor padrão inválido!',
      })
      .optional(),
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
    status: z
      .nativeEnum($Enums.Status, {
        message: 'Status inválido!',
      })
      .optional(),
    abilitiesIds: z
      .array(z.number(), { message: 'Habilidades inválida!' })
      .optional(),
  }),
});
