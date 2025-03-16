import { z } from 'zod';

export const CompanyDeleteAvatarSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
