import { z } from 'zod';

export const RoleDeleteSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
