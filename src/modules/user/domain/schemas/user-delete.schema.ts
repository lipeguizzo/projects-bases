import { z } from 'zod';

export const UserDeleteSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
