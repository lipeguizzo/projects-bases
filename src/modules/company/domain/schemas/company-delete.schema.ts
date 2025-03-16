import { z } from 'zod';

export const CompanyDeleteSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
