import { z } from 'zod';

export const OrganizationDeleteSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
