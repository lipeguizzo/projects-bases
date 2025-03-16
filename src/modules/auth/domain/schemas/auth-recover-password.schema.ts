import { z } from 'zod';

export const AuthRecoverPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'E-mail inválido!',
      })
      .email({ message: 'Formato de e-mail inválido!' }),
  }),
});
