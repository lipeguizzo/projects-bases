import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const UserCreateSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Nome inválido!',
    }),
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
    gender: z.nativeEnum($Enums.Gender, {
      message: 'Gênero inválido!',
    }),
    phone: z.string({
      message: 'Telefone inválido!',
    }),
    organizationId: z.coerce
      .number({
        message: 'Organização inválida!',
      })
      .optional(),
    companyId: z.coerce
      .number({
        message: 'Empresa inválida!',
      })
      .optional(),
    roleId: z.coerce.number({
      message: 'Perfil inválido!',
    }),
    status: z.nativeEnum($Enums.Status, {
      message: 'Status inválido!',
    }),
  }),
});
