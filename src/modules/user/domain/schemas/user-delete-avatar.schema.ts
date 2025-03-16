import { z } from 'zod';

export const UserDeleteAvatarSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
});
