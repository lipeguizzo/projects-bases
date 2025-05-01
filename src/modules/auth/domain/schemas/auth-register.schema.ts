import { ERoleReference } from '@/modules/role/domain/enums/role-reference.enum';
import { EGender } from '@/modules/user/domain/enums/gender.enum';
import { AddressRegisterSchema } from '@/shared/domain/schemas/address-register.schema';
import { z } from 'zod';

export const AuthRegisterSchema = z
  .object({
    name: z.string().min(1, 'Campo obrigatório!').trim(),
    email: z
      .string()
      .min(1, 'Campo obrigatório!')
      .email({ message: 'E-mail inválido!' })
      .trim(),
    gender: z.nativeEnum(EGender, { message: 'Campo obrigatório!' }),
    phone: z.string().min(15, 'Campo obrigatório!').trim(),
    reference: z.nativeEnum(ERoleReference, { message: 'Campo obrigatório!' }),
    password: z
      .string()
      .min(
        1,
        'Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!',
      )
      .trim(),
    confirm: z
      .string()
      .min(
        1,
        'Senha deve ter pelo menos 1 carácter maiúsculo, 1 carácter minúsculo, 1 um carácter numérico e um carácter especial!',
      )
      .trim(),
    organizationName: z.string().optional(),
    organizationTradeName: z.string().optional(),
    organizationEmail: z.string().optional(),
    address: AddressRegisterSchema.optional(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: 'Senhas diferentes!',
    path: ['confirm'],
  })
  .superRefine(
    (
      {
        reference,
        organizationName,
        organizationTradeName,
        organizationEmail,
        address,
      },
      ctx,
    ) => {
      if (reference === ERoleReference.ADMIN_ORGANIZATION) {
        if (organizationName?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['organizationName'],
          });
        if (organizationTradeName?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['organizationTradeName'],
          });
        if (organizationEmail?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['organizationEmail'],
          });
        if (address?.state?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.state'],
          });
        if (address?.city?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.city'],
          });
        if (address?.street?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.street'],
          });
        if (address?.neighborhood?.trim() === '')
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Campo obrigatório!',
            path: ['address.neighborhood'],
          });
      }
    },
  );

export type AuthRegisterData = z.infer<typeof AuthRegisterSchema>;
