import { z } from 'zod';

export const AuthResetPasswordSchema = z.object({
  body: z.object({
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
    token: z.string({
      message: 'Token inválido!',
    }),
  }),
});
