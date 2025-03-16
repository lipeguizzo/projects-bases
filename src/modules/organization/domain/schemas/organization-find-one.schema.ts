import { z } from 'zod';

export const OrganizationFindOneSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
