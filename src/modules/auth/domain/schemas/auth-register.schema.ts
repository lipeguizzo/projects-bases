import { $Enums } from '@prisma/client';
import { z } from 'zod';
import { AddressCreateSchema } from '../../../address/domain/schemas/address-create.schema';

export const AuthRegisterSchema = z.object({
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
    organizationName: z
      .string({
        message: 'Nome de organização inválido!',
      })
      .optional(),
    organizationTradeName: z
      .string({
        message: 'Nome fantasia de organização inválido!',
      })
      .optional(),
    organizationEmail: z
      .string({
        message: 'E-mail de organização inválido!',
      })
      .email({ message: 'Formato de e-mail inválido!' })
      .optional(),
    address: AddressCreateSchema.optional(),
  }),
});
