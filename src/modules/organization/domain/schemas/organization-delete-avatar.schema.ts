import { z } from 'zod';

export const OrganizationDeleteAvatarSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
