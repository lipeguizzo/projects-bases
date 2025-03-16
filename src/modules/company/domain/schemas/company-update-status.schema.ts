import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const CompanyUpdateStatusSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
  body: z.object({
    status: z.nativeEnum($Enums.Status, {
      message: 'Status inválido!',
    }),
  }),
});
