import { z } from 'zod';

export const CompanyFindOneSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
