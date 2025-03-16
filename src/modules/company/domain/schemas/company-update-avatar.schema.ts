import { z } from 'zod';

export const CompanyUpdateAvatarSchema = z.object({
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
