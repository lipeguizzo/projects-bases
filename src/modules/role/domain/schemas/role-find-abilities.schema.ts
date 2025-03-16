import { z } from 'zod';

export const RoleFindAbilitiesSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
