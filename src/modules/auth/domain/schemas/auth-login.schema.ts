import { z } from 'zod';

export const AuthLoginSchema = z.object({
  body: z.object({
    email: z
      .string({
        message: 'E-mail inválido!',
      })
      .email({ message: 'Formato de e-mail inválido!' }),
    password: z
      .string({
        message: 'Senha inválida!',
      })
      .refine(
        (value: string) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(
            value,
          ),
        {
          message:
            'Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!',
        },
      ),
  }),
});
