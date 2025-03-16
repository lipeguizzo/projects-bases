import { z } from 'zod';

export const UserUpdateAvatarSchema = z.object({
  file: z.object(
    {
      originalname: z.string(),
      size: z.number(),
    },
    { message: 'Arquivo inválido!' },
  ),
});
