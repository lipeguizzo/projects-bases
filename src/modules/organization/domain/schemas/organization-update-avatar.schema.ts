import { z } from 'zod';

export const OrganizationUpdateAvatarSchema = z.object({
  params: z.object({
    id: z.coerce.number({ message: 'Id inválido!' }),
  }),
  file: z.object(
    {
      originalname: z.string(),
      size: z.number(),
    },
    { message: 'Arquivo inválido!' },
  ),
});
