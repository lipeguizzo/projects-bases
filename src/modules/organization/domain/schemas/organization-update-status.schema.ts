import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const OrganizationUpdateStatusSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
  body: z.object({
    status: z.nativeEnum($Enums.Status, {
      message: 'Status inválido!',
    }),
  }),
});
