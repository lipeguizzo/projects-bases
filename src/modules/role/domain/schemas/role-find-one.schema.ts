import { z } from 'zod';

export const RoleFindOneSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
